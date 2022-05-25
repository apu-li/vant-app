<template>
  <div id="app">
    <router-view />
    <AppTabBar />
  </div>
</template>

<script>
import AppTabBar from '@/components/AppTabBar.vue';
export default {
  components: {
    AppTabBar,
  },
};
</script>

<style lang="less">
#app {
  background-color: #efefef;
  min-height: 100%;
  font-size: 0.14rem;
}
// 小坑 直接在app加高百分百还是不生效的 需要他的父级也添加
html,
body {
  height: 100%;
}
// 移动端单位 rem em相对当前节点的字体大小
html {
  // 1rem就是100px
  font-size: 100px !important;
}
// 问题：如果此时要对字体设置16px,应该写成多少rem?   0.16
</style>
