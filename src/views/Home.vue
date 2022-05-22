<template>
  <div class="home">
    <!-- 顶部搜索框 -->
    <van-search v-model="searchVal" shape="round" background="#fff" placeholder="请输入搜索关键词" disabled />
    <!-- 首页轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#1989fa">
      <van-swipe-item v-for="item in banner" :key="item.id">
        <img :src="item.image_url" alt="" width="100%" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { GetHomeData } from '../request/api';
export default {
  name: 'HomeView',
  data() {
    return {
      searchVal: '',
      banner: [],
    };
  },
  async created() {
    let homeData = await GetHomeData();
    // console.log(homeData);
    let { banner } = homeData.data;
    this.banner = banner;
  },
};
</script>
