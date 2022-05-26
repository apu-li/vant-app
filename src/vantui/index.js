import Vue from 'vue';
// 按需引入组件
import {
  Search,
  Swipe,
  SwipeItem,
  Icon,
  Tag,
  List,
  Cell,
  DropdownMenu,
  DropdownItem,
  Empty,
  Grid,
  GridItem,
  Card,
  Tabbar,
  TabbarItem,
  Lazyload,
  Pagination,
  Toast,
  Col,
  Row,
  Popup,
  Form,
  Field,
  Button,
} from 'vant';

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
Vue.use(Icon);
Vue.use(Tag);
Vue.use(List);
Vue.use(Cell);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Empty);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Card);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Lazyload, {
  lazyComponent: true,
});
Vue.use(Pagination);
Vue.use(Toast);
Vue.use(Col);
Vue.use(Row);
Vue.use(Popup);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
