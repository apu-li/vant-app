<template>
  <div class="home">
    <van-search v-model="searchVal" shape="round" background="#fff" placeholder="请输入搜索关键词" disabled />
    <p>1111</p>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      searchVal: '',
    };
  },
};
</script>
