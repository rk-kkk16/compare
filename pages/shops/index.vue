<template>
<section class="section">
    <h2>店舗管理</h2>
    <hr />

    <table class="table">
    <thead>
        <tr>
            <th>店舗名</th><th colspan="2"></th>
        </tr>
    </thead>
    <tbody>
    <tr v-for="shop in shops">
        <td><a @click="$router.push({path:'/shops/'+shop.shop_id})">{{ shop.shop_name }}</a></td>
        <td>
            <b-button @click="openEditDialog(shop.shop_id, shop.shop_name)">編集</b-button>
        </td>
        <td>
            <b-button @click="delConfirm(shop.shop_id, shop.shop_name)">削除</b-button>
        </td>
    </tr>
    </tbody>
    </table>
</section>
</template>
<script>
import ShopDB from '~/assets/js/ShopDB';
import PriceDB from '~/assets/js/PriceDB';

export default {

    async asyncData(context) {
        var shopdb = await ShopDB.connect();
        var shops = await shopdb.getAll();
        return {
            shops: shops
        };
    },

    methods: {
        //指定店舗を削除、同時に関連する価格登録も削除する
        delConfirm(shop_id, shop_name) {
            var that = this;
            this.$buefy.dialog.confirm({
                title: '店舗の削除',
                message: shop_name + ' を削除します。\n※この店舗に関連する価格登録も削除されます。',
                confirmText: 'OK',
                type: 'is-danger',
                hasIcon: true,
                props: {shop_id, shop_id},
                onConfirm: async function() {
                    var shopdb = await ShopDB.connect();
                    shopdb.remove(this.props.shop_id);
                    that.shops = await shopdb.getAll();
                    that.$buefy.toast.open('削除しました。');

                    var pricedb = await PriceDB.connect();
                    var prices = await pricedb.getByShopId(this.props.shop_id);
                    for (var i = 0; i < prices.length; i++) {
                        var idx_key = prices[i].idx_key;
                        pricedb.remove(idx_key)
                    }
                }
            });
        },

        //指定店舗の名前を編集するダイアログ表示
        openEditDialog(shop_id, shop_name) {
            var that = this;
            this.$buefy.dialog.prompt({
                title: shop_name + ' の店舗名変更',
                message: '新しい店舗名(※空欄不可)',
                inputAttrs: {
                },
                props: {shop_id, shop_id},
                trapFocus: true,
                onConfirm: async function(value) {
                    if (!value) {
                        that.$buefy.toast.open('店舗名を入力してください。');
                        return;
                    }
                    var shopdb = await ShopDB.connect();
                    shopdb.update(this.props.shop_id, {shop_name:value});
                    for (var i = 0; i < that.shops.length; i++) {
                        if (that.shops[i].shop_id == this.props.shop_id) {
                            that.shops[i].shop_name = value;
                            break;
                        }
                    }
                    that.$buefy.toast.open('店舗名を変更しました。');
                }
            });
        }
    }
}
</script>
