<template>
  <div class="tab-bar">
    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000" route>
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/topic" icon="label-o">专题</van-tabbar-item>
      <van-tabbar-item to="/category" icon="qr">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="less" scoped>
// .tab-bar {
//   position: relative;
//   left: 0;
//   bottom: 0;
// }
</style>
