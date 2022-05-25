import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './vantui';
import 'reset-css';

Vue.config.productionTip = false;
// 全局过滤器
Vue.filter('RMBformat', val => {
  return `￥ ${Number(val).toFixed(2)} 元 `;
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
