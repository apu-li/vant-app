<template>
  <div class="history-hot">
    <!-- 历史记录 -->
    <div class="his">
      <div class="hd">
        <h3>历史记录</h3>
        <van-icon name="delete-o" @click="delHistory" />
      </div>
      <div class="bd" v-show="isShowHis">
        <van-tag
          plain
          type="primary"
          color="#aaa"
          v-for="(item, index) in historyKeywordList"
          :key="index"
          @click="hisSearch(item)"
          >{{ item }}</van-tag
        >
      </div>
    </div>
    <div class="hot">
      <div class="hd">
        <h3>热门搜索</h3>
      </div>
      <div class="bd">
        <van-tag
          plain
          v-for="(item, index) in hotKeywordList"
          :type="item.is_hot ? 'danger' : 'primary'"
          color="#aaa"
          :key="index"
          >{{ item.keyword }}{{ item.is_hot }}</van-tag
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ClearHistoryAPI } from '@/request/api';
export default {
  data() {
    return {
      isShowHis: true,
    };
  },
  props: ['historyKeywordList', 'hotKeywordList'],
  methods: {
    hisSearch(val) {
      // console.log(val);
      this.$emit('hisSearch', val);
    },
    // 清除历史记录
    delHistory() {
      // 这个请求相当于摆设
      ClearHistoryAPI().then(res => {
        console.log(res);
      });
      setTimeout(() => {
        this.$toast.success('删除成功');
        this.isShowHis = false;
      }, 500);
    },
  },
};
</script>

<style lang="less" scoped>
.history-hot {
  background-color: #efefef;
}
.his,
.hot {
  background-color: #fff;
  color: #333;
  padding: 0.1rem;
  font-size: 0.18rem;
  margin-bottom: 0.2rem;
}
.hd {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.1rem;
}
.van-tag {
  margin: 0 0.1rem 0.1rem 0;
}
</style>
