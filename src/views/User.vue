<template>
  <div class="user">
    <!-- 头部没有登录 -->
    <van-row type="flex" @click="showPopup" v-show="!isLogined">
      <van-col span="6">
        <img src="../assets/avatar.png" alt="" />
      </van-col>
      <van-col span="10">请先登录</van-col>
      <van-col span="8">
        <van-icon name="arrow" />
      </van-col>
    </van-row>
    <!-- 头部有登录，有无登录通过登录状态值确定 -->
    <van-row type="flex" v-show="isLogined">
      <van-col span="6">
        <img :src="userInfo.avatar" alt="" />
      </van-col>
      <van-col span="10">{{ userInfo.username }}</van-col>
      <van-col span="8">
        <van-icon name="cross" @click="isShowLogOut = true" />
      </van-col>
    </van-row>
    <!-- 宫格 -->
    <van-grid :column-num="3" square>
      <van-grid-item v-for="value in 9" :key="value" icon="photo-o" text="文字" />
    </van-grid>
    <!-- 登录弹出popup -->
    <van-popup v-model="isShowLogin" position="bottom" :style="{ height: '40%' }">
      <!-- 登录表单 -->
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ pattern, message: '用户名长度2-6位' }]"
        />
        <van-field
          v-model="pwd"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ validator, message: '密码长度为6-10位，包含数字和英文' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </van-popup>
    <!-- 注销弹出popup -->
    <van-popup v-model="isShowLogOut" round class="logOut">
      <h3>登出账号确认</h3>
      <p>您是否想要退出当前账号？</p>
      <div class="btn">
        <van-button type="default" @click="isShowLogOut = false">取消</van-button>
        <van-button type="default" style="color: red" @click="confirmLogOut">确认</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { LoginAPI } from '@/request/api';
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      // 展示登录框
      isShowLogin: false,
      // 展示注销狂
      isShowLogOut: false,
      username: '',
      pwd: '',
      // 匹配用户名的正则
      pattern: /^.{3,6}$/,
      // 用户信息
      userInfo: {},
    };
  },
  created() {
    if (localStorage.getItem('app-data')) {
      this.userInfo = JSON.parse(localStorage.getItem('app-data')).userInfo;
      console.log(this.userInfo);
    }
  },
  computed: {
    ...mapState({
      isLogined: state => state.loginData.isLogined,
    }),
  },
  methods: {
    ...mapMutations({
      changeIsLogined: 'loginData/changeIsLogined',
    }),
    // 点击展示登录窗口
    showPopup() {
      this.isShowLogin = true;
    },
    validator(val) {
      // 匹配密码的正则的正则
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      return reg.test(val);
    },
    async onSubmit() {
      // console.log('submit', this.username, this.pwd);
      // 发送请求并携带参数
      // 格式正则那边已经处理了 所有这里不用处理
      let { errno, data } = await LoginAPI({
        username: this.username,
        pwd: this.pwd,
      });

      // 业务逻辑失败
      if (errno !== 0) return;

      // 登录后的逻辑分析
      // 1. 登录成功提示
      this.$toast.success('登录成功');

      // 2. 关闭登录框
      this.isShowLogin = false;

      // 3. 切换登录状态值
      this.changeIsLogined(true);

      // 4. 保存token和用户信息
      localStorage.setItem('app-data', JSON.stringify(data));

      // 同时拿到用户信息渲染到页面(之前想放到created里面的 但是这样根本拿不到数据，因为并没有进行页面的重载)
      this.userInfo = JSON.parse(localStorage.getItem('app-data')).userInfo;
    },
    // 确认注销
    confirmLogOut() {
      // 注销逻辑分析

      // 1. 关闭注销框
      this.isShowLogOut = false;

      // 2 .将登录状态码改成false
      this.changeIsLogined(false);

      // 3. 清除token
      localStorage.removeItem('app-data');
    },
  },
};
</script>

<style lang="less" scoped>
.van-row {
  padding: 0.2rem 4%;
  height: 0.7rem;
  align-items: center;
  background-color: #333;
  color: #fff;
  img {
    height: 0.7rem;
    border-radius: 50%;
  }
  .van-col:last-child {
    text-align: right;
  }
}
.van-form {
  padding: 0 0.16rem;
  .van-field {
    margin: 0.1rem 0;
  }
}
.logOut {
  width: 3.2rem;
  text-align: center;
  h3 {
    padding-top: 0.3rem;
    font-weight: 500;
    line-height: 24px;
    color: #333;
    font-size: 0.18rem;
  }
  p {
    padding: 0.16rem 0.26rem 0.3rem;
    color: #646566;
    font-size: 0.14rem;
  }
  .btn {
    display: flex;
    justify-content: space-between;
    .van-button {
      flex: 1;
      font-size: 0.18rem;
    }
  }
}
</style>
