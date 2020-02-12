<template>
  <section class="section">
    <top-view :shopdatas="shopdatas" :item1datas="item1datas"/>
    <hr />
    <result-view :calcresult="calcresult"/>
  </section>
</template>

<script>
import topView from '~/components/TopView.vue';
import resultView from '~/components/ResultView.vue';
import ShopDB from '~/assets/js/ShopDB';
import ItemDB from '~/assets/js/ItemDB';

export default {
    components: {
        topView,
        resultView
    },

    data: function() {
        return {
            calcresult: [],
        };
    },

    async asyncData(context) {
        var shopdb = await ShopDB.connect();
        var shopdatas = await shopdb.getAll();

        var itemdb = await ItemDB.connect();
        var item1datas = await ItemDB.getChilds(0);

        return {
            shopdatas: shopdatas,
            item1datas: item1datas
        };
    },
}
</script>
