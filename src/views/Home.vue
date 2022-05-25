<template>
  <div class="home">
    <!-- 用来解决点击弹框之后首页内容在底层还能看见问题 -->
    <!-- 给首页内容套一个div ，v-show通过路径的值来决定是否展示，为了避免即刻消失，外加一个transition 解决立刻消失的问题 -->
    <transition name="van-fade">
      <div v-if="$route.path == '/home'">
        <!-- 顶部搜索框 -->
        <van-search shape="round" background="#fff" placeholder="请输入搜索关键词" disabled @click="searchClick" />

        <!-- 首页轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#1989fa">
          <van-swipe-item v-for="item in homeData.banner" :key="item.id">
            <img :src="item.image_url" alt="" width="100%" />
          </van-swipe-item>
        </van-swipe>

        <!-- 分类grid -->
        <van-grid :column-num="5">
          <van-grid-item v-for="item in homeData.channel" :key="item.id" :icon="item.icon_url" :text="item.name" />
        </van-grid>

        <!-- 品牌 -->
        <div class="brand">
          <div class="title">品牌制作供应商</div>
          <ul>
            <li v-for="item in homeData.brandList" :key="item.id">
              <img :src="item.pic_url" alt="" />
              <div class="txt">
                <h3>{{ item.name }}</h3>
                <p>{{ item.floor_price | RMBformat }}</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- 新品首发 -->
        <div class="newGoods">
          <div class="title newTitle">周一周四·新品首发</div>
          <ul>
            <li v-for="item in homeData.newGoodsList" :key="item.id">
              <img :src="item.list_pic_url" style="display: block" width="100%" alt="" />
              <!-- van-ellipsis超出... -->
              <div class="van-ellipsis">{{ item.name }}</div>
              <div class="price">{{ item.retail_price | RMBformat }}</div>
            </li>
          </ul>
        </div>

        <!-- 人气推荐 -->
        <div class="hotGoods">
          <div class="title">人气推荐</div>
          <van-card
            :price="item.retail_price | RMBformat"
            :desc="item.goods_brief"
            :title="item.name"
            :thumb="item.list_pic_url"
            v-for="item in homeData.hotGoodsList"
            :key="item.id"
          />
        </div>

        <!-- 专题精选 -->
        <div class="topicList">
          <div class="title">专题精选</div>
          <van-swipe :loop="false" :width="300" :show-indicators="false">
            <van-swipe-item v-for="(item, index) in homeData.topicList" :key="index">
              <img :src="item.scene_pic_url" alt="" width="300px" height="200px" />
              <h2 class="van-ellipsis">
                {{ item.title }}
                <span>{{ item.price_info | RMBformat }}</span>
              </h2>
              <p class="van-ellipsis">{{ item.subtitle }}</p>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
    </transition>

    <!-- 遮罩层 -->
    <transition name="van-fade">
      <div class="popup-shadow" v-show="isShowShadow"></div>
    </transition>

    <!-- popup弹出搜索框 -->
    <transition name="van-slide-right">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { GetHomeData } from '../request/api';
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'HomeView',
  data() {
    return {
      homeData: [],
    };
  },
  computed: {
    ...mapState({
      isShowShadow: s => s.showShadow.isShowShadow,
    }),
  },
  methods: {
    ...mapMutations({
      hdIsShowShadow: 'showShadow/hdIsShowShadow',
    }),
    searchClick() {
      this.$router.push('/home/searchPopup');
      this.hdIsShowShadow(true);
    },
  },
  watch: {
    // 监听路由 不是路由守卫 只是用来监听 父子级关系的路由切换
    $route(to, from) {
      // console.log(to, from);
      if (to.name == 'home') {
        this.hdIsShowShadow(false);
      }
    },
  },
  async created() {
    this.homeData = (await GetHomeData()).data;
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
.home {
  // background-color: #efefef;
  padding-bottom: 0.5rem;
}

// 阴影
.popup-shadow {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
// 品牌
.brand {
  margin: 0.2rem 0;
  background-color: #fff;
  color: #333;

  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      width: 49%;
      position: relative;
    }
    .txt {
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 0.14rem;

      p {
        margin-top: 20px;
        color: #8b0000;
      }
    }
  }
  img {
    width: 100%;
  }
}
// 新品首发
.newGoods {
  ul {
    padding: 0.1rem 2%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: #fff;
    li {
      width: 49%;
      margin-bottom: 0.1rem;
      background: #fff;
      text-align: center;
      line-height: 0.3rem;
      .price {
        color: darkred;
      }
    }
  }
}

// 热门人气
/deep/ .hotGoods {
  margin-top: 0.1rem;
  background-color: #fff;
  .van-card__title {
    font-size: 0.18rem;
    line-height: 0.29rem;
  }
  .van-card__desc {
    height: 0.3rem;
    line-height: 0.3rem;
  }
  .pri {
    color: darkred;
  }
}

// 专题精选
/deep/ .topicList {
  margin-top: 0.2rem;
  padding: 0 0.08rem;
  background-color: #fff;
  color: #333;
  .van-swipe-item {
    margin-right: 0.15rem;
  }
  h2 {
    line-height: 0.4rem;
    font-size: 0.16rem;
    margin-right: 0.2rem;
    span {
      color: #8b0000;
    }
  }
  p {
    font-size: 0.14rem;
    margin: 0 0.2rem 0.1rem 0;
  }
}

// title公用
.title {
  height: 0.5rem;
  font-size: 0.2rem;
  text-align: center;
  line-height: 0.5rem;
  background-color: #fff;
}
.newTitle {
  font-size: 0.18rem;
}
</style>
