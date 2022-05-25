<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
      <van-cell v-for="item in searchTipList" :key="item" :title="item"
    /></van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // list: [1,2,3],
      loading: false,
      finished: true,
    };
  },
  props: ['searchTipList'],
};
</script>

<style lang="less" scoped></style>
