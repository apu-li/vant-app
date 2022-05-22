<template>
  <div class="home">
    <!-- 顶部搜索框 -->
    <van-search v-model="searchVal" shape="round" background="#fff" placeholder="请输入搜索关键词" disabled @click="$router.push('/home/searchPopup')" />
    <!-- 首页轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#1989fa">
      <van-swipe-item v-for="item in banner" :key="item.id">
        <img :src="item.image_url" alt="" width="100%" />
      </van-swipe-item>
    </van-swipe>
    <transition name="van-slide-right">
      <router-view></router-view>
    </transition>
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

<style lang="less" scoped>
// vant可以直接改name 封装好的看文档

// Vue的过渡效果的写法：(注意事项，在过渡盒子身上不要书写这个过渡属性)
// 进入过渡的初始状态，以及离开过渡的结束状态
// slice是在transition 标签的name
/* .slice-enter,
.slice-leave-to {
  right: -100%;
}
// 过渡时间
.slice-enter-active,
.slice-leave-active {
  transition: all 0.5s;
}
// 进入过的的结束状态,以及离开过渡的初始状态
.slice-enter-to,
.slice-leave {
  right: 0;
} */
</style>
