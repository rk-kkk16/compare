<template>
  <section class="section">

    <div class="columns is-mobile">
<!-- price -->
      <div class="column is-half">
        <b-field label="価格(円)">
          <b-input type="number" v-model="yen"></b-input>
        </b-field>
      </div>
<!-- /price -->
<!-- weight -->
      <div class="column is-half">
        <b-field label="重量・容積">
          <b-input type="number" v-model="weight"></b-input>
        </b-field>
      </div>
<!-- /weight -->
    </div>

    <div class="columns"><div class="column is-full">
        <div class="buttons" style="float:right">
            <b-button @click="calcPrice">Calcurate!!</b-button>
        </div>
        <br clear="both"/>
        <b-table :data="sumresult" :columns="sumresult_cols" :has-modal-cards="false" :mobile-cards="false"></b-table>
    </div></div>

    <hr />

<!-- item -->
    <b-field label="品目">
    <div class="columns">
      <div class="column is-half">
        <b-select v-model="item_1" @input="getItem2Datas();showItem2=true" expanded="true">
            <option v-for="item1data in item1datas" :value="item1data.item_id">{{ item1data.item_name }}</option>
        </b-select>
      </div>

      <div class="column is-half" v-show="showItem2">
        <b-select v-model="item_2" expanded="true">
            <option value="0">(選択なし)</option>
            <option v-for="item2data in item2datas" :value="item2data.item_id">{{ item2data.item_name }}</option>
        </b-select>
      </div>
    </div>
    </b-field>

    <div class="columns">
      <div class="column is-full">
         <b-button v-show="showAddItemButtonP" @click="showAddItemButtonP=false;showAddItemButtonM=true;showAddItem=true">+</b-button>
         <b-button v-show="showAddItemButtonM" @click="showAddItemButtonP=true;showAddItemButtonM=false;showAddItem=false">-</b-button>
      </div>
    </div>

    <b-field label="品目を追加" v-show="showAddItem">
    <div class="columns">
      <div class="column is-10">
          <b-input type="text" v-model="item_add"></b-input><br>
          <b-checkbox v-model="item_add_sub" true-value="1" false-value="0">サブ品目として登録</b-checkbox>
      </div>
      <div class="column is-2">
        <b-button @click="saveItem">Add</b-button>
      </div>
    </div>
    </b-field>
<!-- /item -->


<!-- shop -->
    <b-field label="店舗">
    <div class="columns">
      <div class="column is-full">
        <b-select v-model="shop" expanded="true">
          <option v-for="shopdata in shopdatas" :value="shopdata.shop_id">{{ shopdata.shop_name }}</option>
        </b-select>
      </div>
    </div>
    </b-field>

    <div class="columns">
      <div class="column is-full">
         <b-button v-show="showAddShopButtonP" @click="showAddShopButtonP=false;showAddShopButtonM=true;showAddShop=true">+</b-button>
         <b-button v-show="showAddShopButtonM" @click="showAddShopButtonP=true;showAddShopButtonM=false;showAddShop=false">-</b-button>
      </div>
    </div>

    <b-field label="店舗を追加" v-show="showAddShop">
    <div class="columns">
      <div class="column is-10">
          <b-input type="text" v-model="shop_add">{{ shop_add }}</b-input>
      </div>
      <div class="column is-2">
        <b-button @click="saveShopName">Add</b-button>
      </div>
    </div>
    </b-field>
<!-- /shop -->

   <div class="columns"><div class="column is-full">
     <div class="buttons" style="float:right">
       <b-button @click="comparePrice">Compare!!</b-button>
       <b-button style="margin-left:15px" @click="savePrice">Save</b-button>
     </div>
     <br clear="both"/>
   </div></div>
  </div>
  </section>
</template>
<script>
import ShopDB from '~/assets/js/ShopDB';
import ItemDB from '~/assets/js/ItemDB';
import PriceDB from '~/assets/js/PriceDB';

export default {
    props: ['shopdatas', 'item1datas'],
    data: function() {
       return {
           sumresult: [
               {name:'単価', value:''},
           ],
           sumresult_cols: [
               {field:'name', label:'', width:'70%', numeric:true},
               {field:'value', label:'', width:'30%'},
           ],
           unit_price: 0,

           item2datas: [],
           showItem2: false,
           showItem3: false,
           showAddItem: false,
           showAddItemButtonP: true,
           showAddItemButtonM: false,
           showAddShopButtonP: true,
           showAddShopButtonM: false,
           shop_add: '', item_add: '', item_add_sub: 0,
       };
    },

    methods: {
        //入力値から単価計算
        calcPrice: function() {
            //todo: vee-validateにすること
            var in_yen = this.yen;
            var in_weight = this.weight;
            if (!in_yen) {
                alert('価格を入力してください。');
                return;
            }
            if (!in_weight) {
                alert('重量・容積を入力してください。');
                return;
            }
            var unit_price = calcuratePrice(in_yen, in_weight);
            this.sumresult = [{name:'単価', value: unit_price.toLocaleString()+ '円'}];
            this.unit_price = unit_price;
        },

        //店舗名の登録
        saveShopName: async function() {
            var shopdb = await ShopDB.connect();
            var shop_name = this.shop_add;
            if (!shop_name) {
                //todo: vee-validateにすること
                alert('店舗名を入力してください。');
                return;
            }
            this.shop_add = '';
            shopdb.add({shop_name:shop_name});
            //新しいデータでoptionsリフレッシュ
            this.shopdatas = await shopdb.getAll();
        },

        //品目の登録
        saveItem: async function() {
            var itemdb = await ItemDB.connect();
            var item_name = this.item_add;
            if (!item_name) {
                //todo: vee-validateにすること
                alert('品目を入力してください。');
                return;
            }

            var parent_id = 0;
            //item_add_sub==1の場合はparent_idをitem_1から取る
            if (this.item_add_sub == 1) {
                parent_id = this.item_1;
                this.item_add_sub = 0;
            }

            this.item_add = '';
            itemdb.add({item_name: item_name, parent_id: parent_id});
            this.item1datas = await itemdb.getChilds(0);
            if (parent_id != 0) {
                this.item2datas = await itemdb.getChilds(parent_id);
            }
        },

        getItem2Datas: async function() {
            var parent_id = this.item_1;
            var itemdb = await ItemDB.connect();
            var item2datas = await itemdb.getChilds(parent_id);
            this.item2datas = item2datas;
        },

        //item+shop:単価の登録 同じidx_keyについては上書きする
        savePrice: async function() {
            //todo: vee-validateにすること
            var in_yen = this.yen; 
            var in_weight = this.weight;
            if (!in_yen) {
                alert('価格を入力してください。');
                return;
            }
            if (!in_weight) {
                alert('重量・容積を入力してください。');
                return;
            }
            var unit_price = calcuratePrice(in_yen, in_weight);
            this.sumresult = [{name:'単価', value: unit_price.toLocaleString()+ '円'}];
            this.unit_price = unit_price;


            var item_id = 0;
            if (this.item_2) {
                item_id = parseInt(this.item_2); 
            }
            else if (this.item_1) {
                item_id = parseInt(this.item_1);
            } else {
                alert('品目を指定してください。');
                return;
            }
            var shop_id = this.shop;
            if (!shop_id) {
                alert('店舗を指定してください。');
                return;
            }

            var pricedb = await PriceDB.connect();
            pricedb.save(item_id, shop_id, this.unit_price);
            this.$buefy.toast.open('この単価を指定の品目,店舗について登録しました。');
        },

        //指定品目について計算した単価と登録されている各店舗の単価とを比較する
        //現在の単価を一番上に、登録されている単価を昇順で表示
        //一番安いやつに最安マークつける
        comparePrice: async function() {
            //todo: vee-validateにすること
            var in_yen = this.yen;
            var in_weight = this.weight;
            if (!in_yen) {
                alert('価格を入力してください。');
                return;
            }
            if (!in_weight) {
                alert('重量・容積を入力してください。');
                return;
            }
            var unit_price = calcuratePrice(in_yen, in_weight);
            this.sumresult = [{name:'単価', value: unit_price.toLocaleString()+ '円'}];
            this.unit_price = unit_price;

            //item_2>item_1の順で指定品目とる
            var item_id = 0;
            if (this.item_2) {
                item_id = this.item_2;
            }
            else if (this.item_1) {
                item_id = this.item_1;
            } else {
                alert('品目を指定してください。');
                return;
            }
            this.$nuxt.$emit('COMPARE_EVENT', {unit_price:unit_price, item_id:item_id});
        }
    },
}


function calcuratePrice(in_yen, in_weight) {
    var yen = parseInt(in_yen);
    var weight = parseInt(in_weight);
    var unit_price = yen / weight * 100;
    //小数点一位にする
    unit_price = Math.round(unit_price * 10) / 10;
    return unit_price;
}
</script>
