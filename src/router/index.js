import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/home/searchPopup',
        name: 'searchPopup',
        component: () => import(/* webpackChunkName: "about" */ '../views/SearchPopup.vue'),
      },
    ],
    meta: {
      tabbarActiveNum: 0,
    },
  },

  {
    path: '/topic',
    name: 'topic',
    component: () => import(/* webpackChunkName: "about" */ '../views/Topic.vue'),
    meta: {
      tabbarActiveNum: 1,
    },
  },
  {
    path: '/category',
    name: 'category',
    component: () => import(/* webpackChunkName: "about" */ '../views/Category.vue'),
    meta: {
      tabbarActiveNum: 2,
    },
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue'),
    meta: {
      tabbarActiveNum: 3,
    },
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "about" */ '../views/User.vue'),
    meta: {
      tabbarActiveNum: 4,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// 全局路由守卫/路由拦截 能够在每一次跳转路由之前拦截下来 做一定的逻辑处理

/* router.beforeEach((to, from, next) => {
  // 什么时候执行这个函数 当有路由发生跳转的时候
  // to : 要去往的路由对象
  // from ： 从哪里出发的这个路由对象
  // console.log('to', to);
  // console.log('from', from);

  // 如果写在全局守卫就相当于不去购物车的页面 也会进行路由跳转 这样会浪费资源 所以最好把他写在组件内部
  // 判断是不是要进入购物车
  // if (to.path == '/cart') {
  //   // 查看是否登录;
  //   let token = localStorage.getItem('token1');
  //   if (token) {
  //     next();
  //   } else {
  //     // 没有登录就调到用户界面
  //     setTimeout(() => {
  //       Vue.prototype.$toast.success('请先登录');
  //       next('/user');
  //     }, 800);
  //   }
  //   return;
  // }
  // next();
}); */

export default router;
