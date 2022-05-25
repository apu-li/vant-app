<template>
  <div>购物车</div>
</template>

<script>
import Vue from 'vue';
export default {
  data() {
    return {};
  },
  // 组件内的路由守卫
  beforeRouteEnter(to, from, next) {
    // 查看是否登录;
    let token = localStorage.getItem('token1');
    if (!token) {
      // 没有登录就调到用户界面
      setTimeout(() => {
        // 不能获取组件实例 `this` ！
        // 因为当守卫执行时，组件实例还没被创建！
        Vue.prototype.$toast.success('请先登录');
        next('/user');
      }, 800);
      return;
    }
    next();
  },
};
</script>

<style lang="less" scoped></style>
