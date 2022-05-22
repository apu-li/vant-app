import Vue from 'vue';
// 按需引入组件
import { Search, Swipe, SwipeItem } from 'vant';

// 目前项目已经配置好自动按需引入样式
// 手动按需引入：
// import 'vant/lib/button/style';
// import 'vant/lib/stepper/style';
// 整个ui框架的样式都引入进来：
// import 'vant/lib/index.css';

// 注册组件
Vue.use(Search);
Vue.use(Swipe);
Vue.use(SwipeItem);
