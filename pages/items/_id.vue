<template>
<section class="section">
<p><nuxt-link to="/items/">&lt;&lt;品目管理</nuxt-link></p>
    <h2>{{ item_name }} の登録単価</h2>
    <hr />

    <table class="table is-mobile" style="width:100%">
    <thead>
        <tr><th>品目名</th><th style="width:6em">単価</th><th style="width:10em">登録日時</th></tr>
    </thead>
    <tbody v-if="prices.length > 0">
        <tr v-for="price in prices">
            <td>{{ price.shop_name }}</td>
            <td>{{ price.price }}円</td>
            <td>{{ price.updated }}</td>
        </tr>
    </tbody>
    <tbody v-else>
        <tr><td colspan="3">単価の登録はありません。</td></tr>
    </tbody>
    </table>
</section>
</template>
<script>
import PriceDB from '~/assets/js/PriceDB';
import ItemDB from '~/assets/js/ItemDB';
import ShopDB from '~/assets/js/ShopDB';

export default {
    async asyncData(context) {
        var prices = {};

        var item_id = parseInt(context.params.id);
        var itemdb = await ItemDB.connect();
        var item = await itemdb.get(item_id);

        var shopdb = await ShopDB.connect();

        var pricedb = await PriceDB.connect();
        var prices = await pricedb.getByItemId(item_id);
        for (var i = 0; i < prices.length; i++) {
            var idx_key = prices[i].idx_key;
            prices[i].updated = context.app.$ts2date(prices[i].updated);

            var shop = await shopdb.get(prices[i].shop_id);
            prices[i].shop_name = shop.shop_name;
        }

        return {
            item_name: item.item_name,
            prices: prices,
        };
    },
    
}
</script>
