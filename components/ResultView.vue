<template>
<section id="resultview">

  <b-table :data="calcresult" :columns="columns">
    <template slot-scope="props">
      <b-table-column field="mark" label="" class="field">
        <template v-for="mark in props.row.mark">
          <b-tag v-if="mark == 'best'" class="is-success"><b>さいやす！</b></b-tag>
          <b-tag v-if="mark == 'now'" class="is-info"><b>今ここ</b></b-tag>&nbsp;
        </template>
      </b-table-column>
      <b-table-column field="price" label="グラム単価(円)">
        {{ props.row.price }}
      </b-table-column>
      <b-table-column field="shop" label="店舗">
        {{ props.row.shop }}
      </b-table-column>
      <b-table-column field="lastmodified" label="最終更新">
        {{ props.row.lastmodified }}
      </b-table-column>
    </template>
    <template slot="empty">
      <section class="section">
        <p>データがありません。</p>
      </section>
    </template>
  </b-table>
</section>
</template>
<script>
import ShopDB from '~/assets/js/ShopDB';
import PriceDB from '~/assets/js/PriceDB';

export default {
    props: ['calcresult'],

    created() {
        this.$nuxt.$on('COMPARE_EVENT', async data => {
            var now_unit_price = data.unit_price;
            var now_item_id = data.item_id;
            var now_shop_id = data.shop_id;
            this.calcresult = [];

            var shopdb = await ShopDB.connect();
            var now_shop = await shopdb.get(now_shop_id);

            this.calcresult.push({mark:['now'], price:now_unit_price, shop:now_shop.shop_name, lastmodified:''});
            var pricedb = await PriceDB.connect();
            var prices = await pricedb.getByItemId(now_item_id);

            var min_price = now_unit_price;
            var min_off = 0;
            for (var i = 0; i < prices.length; i++) {
                if (min_price > Math.floor(prices[i].price)) {
                    min_price = Math.floor(prices[i].price);
                    min_off = i+1;
                }
                this.calcresult.push({mark:[], price:prices[i].price, shop:'', lastmodified:this.$ts2date(prices[i].updated)});
                var shop = await shopdb.get(prices[i].shop_id);
                if (shop) {
                    this.calcresult[i+1].shop = shop.shop_name;
                }
            }
            this.calcresult[min_off].mark.push('best');

            //価格昇順にソート
            this.calcresult.sort(function(a, b) {
                if (a.price < b.price) { return -1; }
                else if (a.price > b.price) { return 1; }
                else { return 0; }
            });
        })
    }
}
</script>
