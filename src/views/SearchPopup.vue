<template>
  <div class="search-popup">
    <van-search
      v-model="searchVal"
      show-action
      :placeholder="replaceVal"
      @search="onSearch"
      @cancel="onCancel"
      @input="onInput"
    />

    <!-- 不同的情况有三种情况展示 三个组件 可以使用v-if v-else-if 展示 -->
    <HistoryHot
      v-if="blockShow == 1"
      :historyKeywordList="historyKeywordList"
      :hotKeywordList="hotKeywordList"
      @hisSearch="hisSearch"
    />

    <SearchTipsList v-else-if="blockShow == 2" :searchTipList="searchTipList" />

    <SearchProductList
      v-else-if="blockShow == 3"
      :searchResData="searchResData"
      :filterCategory="filterCategory"
      @categoryChange="categoryChange"
      @priceChange="priceChange"
    />
  </div>
</template>

<script>
import HistoryHot from '@/components/search/HistoryHot.vue';
import SearchProductList from '@/components/search/SearchProductList.vue';
import SearchTipsList from '@/components/search/SearchTipsList.vue';
import { mapMutations } from 'vuex';
import { GetHishotData, GetSearchTipsData, GetSearchRes } from '@/request/api';
export default {
  components: {
    HistoryHot,
    SearchProductList,
    SearchTipsList,
  },
  data() {
    return {
      searchVal: '',
      // blockshow 变量用来控制切换搜索页面对应的界面
      // 1 表示 历史热门
      // 2 表示 搜索提示
      // 3 表示 产品列表展示
      blockShow: 1,
      // 搜索框中的提示热词
      replaceVal: '',
      // 历史记录
      historyKeywordList: [],
      // 热门提示
      hotKeywordList: [],
      // 搜索提示列表
      searchTipList: [],
      // 搜索产品结果
      searchResData: [],
      // 搜索产品分类
      filterCategory: [],
      // 分类id 后面转成了val
      categoryId: 0,
      // 价格排序
      order: '',
      // 使用id排序还是price排序
      sort: 'id',
    };
  },
  async created() {
    // this.SearchHotHis = await GetSearchHotHis();
    // 请求 历史和热门
    let { defaultKeyword, historyKeywordList, hotKeywordList } = (await GetHishotData()).data;
    this.historyKeywordList = historyKeywordList;
    this.hotKeywordList = hotKeywordList;
    this.replaceVal = defaultKeyword.keyword;
  },
  methods: {
    ...mapMutations({
      hdIsShowShadow: 'showShadow/hdIsShowShadow',
    }),

    // 给子组件用的方法 发起按价格排序请求
    priceChange(val) {
      this.order = val;
      this.sort = 'price';
      this.onSearch(this.searchVal);
    },

    // 给子组件用的方法 发起选中对应分类的请求
    categoryChange(id) {
      this.categoryId = id;
      this.onSearch(this.searchVal);
    },

    // 给子组件HistoryHot使用使用历史记录搜索
    hisSearch(val) {
      // console.log(val);
      this.onSearch(val);
    },

    // 回车搜索
    onSearch(val) {
      // 回车搜索进入搜索结果显示页面
      this.blockShow = 3;

      // 并发送请求
      GetSearchRes({
        keyword: val,
        categoryId: this.categoryId, // 类别id，代表下拉菜单中的全部、居家等选项
        order: this.order, // 排列顺序，desc表示价格由高到低，asc表示价格由低到高
        sort: this.sort, // 可以是id或price
      }).then(res => {
        let { data, filterCategory } = res.data;
        // 搜索产品结果
        this.searchResData = data;

        // 搜索产品分类;
        this.filterCategory = filterCategory.map(e => {
          // 将数据转成我们想要的格式
          return { value: e.id, text: e.name, checked: e.checked };
        });
      });
      // 总结经验：有时候，后端给我们的数据跟我们需要的格式有点不一样，我们就需要把后端给我们的数据处理成我们想要的数据
    },

    // 取消
    onCancel() {
      this.$router.go(-1);
      // 这样写有问题 虽然点击 可以隐藏 但是使用回退 就不能隐藏遮罩层 所以改成路由监听的方式
      // this.hdIsShowShadow(false);
    },

    // 输入事件
    onInput(val) {
      // 显示组件并发送请求
      this.blockShow = 2;
      // if(!this.searchVal) this.blockShow = 1;
      // 请求搜索提示 传参
      GetSearchTipsData({
        keyword: val,
      }).then(res => {
        // 搜索提示数据
        this.searchTipList = res.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.search-popup {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: #efefef;
  z-index: 2;
}
</style>
