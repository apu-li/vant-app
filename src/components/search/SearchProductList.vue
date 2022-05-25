<template>
  <div class="search-product">
    <van-dropdown-menu>
      <!-- 这种ui框架 还是注意看他文档有什么属性我们是可以去利用的，或者都是什么意思，方便开发 -->
      <van-dropdown-item title="综合" disabled />
      <van-dropdown-item title="价格" v-model="priceVal" :options="option" @change="priceChange" />
      <van-dropdown-item title="分类" v-model="categoryVal" :options="filterCategory" @change="categoryChange" />
    </van-dropdown-menu>
    <!-- 没有产品显示的空组件，隐藏product组件（我的思路作了计算属性，看了老师的就大可不必 v-if） -->
    <van-empty v-if="searchResData.length == 0" image="search" description="抱歉，找不到商品" />
    <Products v-else :searchResData="searchResData" />
  </div>
</template>

<script>
import Products from '@/components/Products.vue';
export default {
  components: { Products },
  data() {
    return {
      priceVal: '',
      categoryVal: 0,
      // desc表示价格由高到低，asc表示价格由低到高
      option: [
        { text: '价格由高到低', value: 'desc' },
        { text: '价格由低到高', value: 'asc' },
      ],
    };
  },
  mounted() {
    // 正确勾中分类中的某一项，要把categoryVal激活 categoryVal的值必须为这个数组中checked为true的这一项
    this.filterCategory.forEach(e => {
      if (e.checked) {
        this.categoryVal = e.value;
      }
    });
  },
  methods: {
    // 排序的qingqiu
    priceChange(val) {
      this.$emit('priceChange', val);
    },
    // 分类的请求
    categoryChange(val) {
      this.$emit('categoryChange', val);
    },
  },

  props: ['searchResData', 'filterCategory'],

  // 显示无数据
  // computed: {
  //   isEmpty() {
  //     return this.searchResData.length > 0 ? true : false;
  //   },
  // },
};
</script>

<style lang="less" scoped>
// .search-product {
// }
</style>
