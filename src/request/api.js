// 管理这个项目的所有接口
import axios from "./requset"

// 请求首页数据
export const GetHomeData = () => axios.get("/index/index");

// export const GetHomeData = function(){
//   return axios.get("/index/index");
// }
