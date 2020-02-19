<template>
<section class="section">
    <h2>品目管理</h2>
    <hr />

    <table class="table is-mobile" style="width:100%">
    <thead>
        <tr><th>品目</th><th colspan="3"></th></tr>
    </thead>
    <tbody v-if="items.length > 0">
        <template v-for="item in items">
          <tr>
            <td><a @click="$router.push({path:'/items/'+item.item_id})">{{ item.item_name }}</a></td>
            <td style="width:3em">
               <template v-if="subitems[item.item_id] && subitems[item.item_id].length > 0">
                 <button v-if="subitem_visis[item.item_id]=='none'" @click="subitem_visis[item.item_id] = ''">▼</button>
                 <button v-else @click="subitem_visis[item.item_id] = 'none'">▲</button>
               </template>
            </td>
            <td style="width:4.5em"><button @click="openEditDialog(item.item_id, item.item_name, 0)">編集</button></td>
            <td style="width:4.5em"><button @click="delConfirm(item.item_id, item.item_name)">削除</button></td>
          </tr>
          <template v-if="subitems[item.item_id] && subitems[item.item_id].length > 0">
            <tr v-for="subitem in subitems[item.item_id]" :style="{'display':subitem_visis[item.item_id]}">
                <td style="padding-left:4em" colspan="2">
                    <a @click="$router.push({path:'/items/'+subitem.item_id})">
                        {{ subitem.item_name }}
                    </a>
                </td>
                <td><button @click="openEditDialog(subitem.item_id, subitem.item_name, subitem.parent_id)">編集</button></td>
                <td><button @click="delSubConfirm(subitem.item_id, subitem.item_name, subitem.parent_id)">削除</button></td>
            </tr>
          </template>
        </template>
    </tbody>
    <tbody v-else>
        <tr><td colspan="4">品目の登録がありません。</td></tr>
    </tbody>
    </table>
</section>
</template>
<script>
import ItemDB from '~/assets/js/ItemDB';
import PriceDB from '~/assets/js/PriceDB';

export default {
    async asyncData(context) {
        var itemdb = await ItemDB.connect();
        var items = await itemdb.getChilds(0);
        var subitems = {};
        var subitem_visis = {};

        for (var i = 0; i < items.length; i++) {
            subitems[items[i].item_id] = await itemdb.getChilds(items[i].item_id);
            subitem_visis[items[i].item_id] = 'none';
        }

        return {
            items:items,
            subitems:subitems,
            subitem_visis:subitem_visis
        };
    },

    methods: {
        //指定サブ品目を削除 同時に関連する価格登録も削除する
        delSubConfirm(item_id, item_name, parent_id) {
            var that = this;
            this.$buefy.dialog.confirm({
                title: 'サブ品目の削除',
                message: item_name + ' を削除します。\n※この品目に関連する価格登録も削除されます。',
                confirmText: 'OK',
                type: 'is-danger',
                hasIcon: true,
                props: {item_id, parent_id},
                onConfirm: async function() {
                    var itemdb = await ItemDB.connect();
                    itemdb.remove(this.props.item_id);

                    that.subitems[this.props.parent_id] = await itemdb.getChilds(this.props.parent_id);
                    if (that.subitems[this.props.parent_id].length == 0) {
                        that.subitem_visis[this.props.parent_id] = 'none';
                    }

                    that.$buefy.toast.open('削除しました。');

                    var pricedb = await PriceDB.connect();
                    var prices = await pricedb.getByItemId(this.props.item_id);
                    for (var i = 0; i < prices.length; i++) {
                        pricedb.remove(prices[i].idx_key);
                    }
                }
            });
        },

        //指定品目を削除、同時にサブ品目と関連する価格登録も削除する
        delConfirm(item_id, item_name) {
            var that = this;
            this.$buefy.dialog.confirm({
                title: '品目の削除',
                message: item_name + ' を削除します。\n※ この品目に関連する価格登録も削除されます。(サブ品目も含まれます)',
                confirmText: 'OK',
                type: 'is-danger',
                hasIcon: true,
                props: {item_id},
                onConfirm: async function() {
                    var itemdb = await ItemDB.connect();
                    itemdb.remove(this.props.item_id);

                    that.items = await itemdb.getChilds(0);

                    delete that.subitems[this.props.item_id];
                    delete that.subitem_visis[this.props.item_id];

                    that.$buefy.toast.open('削除しました。');

                    var pricedb = await PriceDB.connect();
                    var prices = await pricedb.getByItemId(this.props.item_id);
                    for (var i = 0; i < prices.length; i++) {
                        pricedb.remove(prices[i].idx_key);
                    }

                    //サブ品目も削除
                    var subitems = await itemdb.getChilds(this.props.item_id);
                    for (var i = 0; i < subitems.length; i++) {
                        itemdb.remove(subitems[i].item_id);
                        var prices = await pricedb.getByItemId(subitems[i].item_id);
                        for (var j = 0; j < prices.length; j++) {
                            pricedb.remove(prices[j].idx_key);
                        }
                    }
                }
            });
        },

        //品目名を更新するダイアログを表示、変更実施まで
        openEditDialog(item_id, item_name, parent_id) {
            var that = this;
            this.$buefy.dialog.prompt({
                title: item_name + ' の品目名変更',
                message: '新しい品目名(※ 空欄不可)',
                inputAttrs: {
                },
                props: {item_id, item_id, parent_id},
                trapFocus: true,
                onConfirm: async function(value) {
                    if (!value) {
                        that.$buefy.toast.open('品目名を入力してください。');
                        return;
                    }
                    var itemdb = await ItemDB.connect();
                    itemdb.update(this.props.item_id, {item_name:value});

                    that.$buefy.toast.open('品目名を変更しました。');

                    if (this.props.parent_id > 0) {
                        for (var i = 0; i < that.subitems[this.props.parent_id].length; i++) {
                            if (that.subitems[this.props.parent_id][i].item_id == this.props.item_id) {
                                that.subitems[this.props.parent_id][i].item_name = value;
                                break;
                            }
                        }
                    } else {
                        for (var i = 0; i < that.items.length; i++) {
                            if (that.items[i].item_id == this.props.item_id) {
                                that.items[i].item_name = value;               
                                break;
                            }
                        }
                    }
                }
            });
        }
    }
}
</script>
