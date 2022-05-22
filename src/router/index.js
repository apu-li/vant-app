import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

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
  },
  {
    path: '/about',
    name: 'about',
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
