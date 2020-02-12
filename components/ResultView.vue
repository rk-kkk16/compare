<template>
<section id="resultview">

  <b-table :data="calcresult" :columns="columns"></b-table>
</section>
</template>
<script>
import ShopDB from '~/assets/js/ShopDB';
import PriceDB from '~/assets/js/PriceDB';

export default {
    data: function() {
        return {
            columns: [
                { field: 'mark', label: '評価'},
                { field: 'price', label: 'グラム単価(円)'},
                { field: 'shop', label: '店舗'},
                { field: 'lastmodified', label: '最終更新'},
            ]
        }
    },
    props: ['calcresult'],

    created() {
        this.$nuxt.$on('COMPARE_EVENT', async data => {
            var now_unit_price = data.unit_price;
            var now_item_id = data.item_id;
            this.calcresult = [];
            this.calcresult.push({mark:'', price:now_unit_price, shop:'現在地', lastmodified:''});
            var shopdb = await ShopDB.connect();
            var pricedb = await PriceDB.connect();
            var prices = await pricedb.getByItemId(now_item_id);

            var min_price = now_unit_price;
            var min_off = 0;
            for (var i = 0; i < prices.length; i++) {
                if (min_price > Math.floor(prices[i].price)) {
                    min_price = Math.floor(prices[i].price);
                    min_off = i+1;
                }
                this.calcresult.push({mark:'', price:prices[i].price, shop:'', lastmodified:this.$ts2date(prices[i].updated)});
                var shop = await shopdb.get(prices[i].shop_id);
                if (shop) {
                    this.calcresult[i+1].shop = shop.shop_name;
                }
            }
            this.calcresult[min_off].mark = 'さいやす！！';

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
