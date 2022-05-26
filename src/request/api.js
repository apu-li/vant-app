// 管理这个项目的所有接口
import axios from './requset';

// 请求首页数据
export const GetHomeData = () => axios.get('/index/index');

// 请求历史记录和热门搜索 （get请求无参数的写法）
export const GetHishotData = () => axios.get('/search/index');

// 请求搜索提示列表  (get请求携带参数的写法)
export const GetSearchTipsData = params => axios.get('/search/helper', { params });
// export const GetSearchTipsData = (val) => axios.get("/search/helper",{
//   params:{
//     keyword:val
//   }
// });

// 请求搜索结果
export const GetSearchRes = params => axios.get('/goods/list', { params });

// 专题页面数据请求
export const TopicDataAPI = parmas => axios.get('/topic/list', parmas);

// 清除历史记录的请求
export const ClearHistoryAPI = () => axios.post('/search/clearhistory');

// 请求登录 /auth/loginByWeb
export const LoginAPI = params => axios.post('/auth/loginByWeb', params);
