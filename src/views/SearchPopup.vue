<template>
  <div class="search-popup">
    <button @click="$router.go(-1)">调回去把</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
}
</style>
