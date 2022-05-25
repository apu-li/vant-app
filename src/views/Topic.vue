<template>
  <div class="topic">
    <div class="box" v-for="(item, index) in topicData" :key="index">
      <img v-lazy="item.scene_pic_url" />
      <div class="title">{{ item.title }}</div>
      <div class="tip van-ellipsis">{{ item.subtitle }}</div>
      <div class="price">{{ item.price_info | RMBformat }}</div>
    </div>
    <!-- 分页没有任何思路 -->
    <van-pagination v-model="currentPage" :page-count="totalPages" mode="simple" />
  </div>
</template>

<script>
import { TopicDataAPI } from '@/request/api';
export default {
  data() {
    return {
      topicData: [],
      totalPages: 1,
      currentPage: 1,
    };
  },
  async created() {
    let res = await TopicDataAPI({
      page: 1,
      size: 10,
    });
    this.topicData = res.data.data;
    this.totalPages = res.data.totalPages;
    this.currentPage = res.data.currentPage;
    // console.log(res.data.data);
  },
};
</script>

<style lang="less" scoped>
.topic {
  padding-bottom: 0.7rem;
}
.box {
  color: #333;
  text-align: center;
  background-color: #fff;
  margin-bottom: 0.2rem;
  img {
    width: 100%;
  }
  .title {
    font-size: 0.18rem;
    margin: 0.1rem 0;
  }
  .tip {
    margin: 0.2rem 0;
    color: #1f1f1f;
    font-size: 0.16rem;
  }
  .price {
    font-size: 0.14px;
    color: #9b0000;
    padding-bottom: 0.2rem;
  }
}
</style>
