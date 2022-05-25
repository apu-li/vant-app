import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://kumanxuan1.f3322.net:8001',
  timeout: 5000,
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 什么时候执行这里代码？？  发送请求之前执行这里的代码
    // console.log("config为：",config); // 是一个axios帮我们封装好的关于本次请求详情的一个对象

    // ！！！在这个函数中，可以去做一些请求发出去之前的准备工作，例如把token添加请求头
    // let token = localStorage.getItem("token");
    // if(token){
    //   // 把token设置到请求头中
    // }
    // 需要返回config才能成功发出请求
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  res => {
    // 什么时候执行这里的代码？？ 接收到响应之后，组件中then方法执行之前执行这里的代码

    // if (res.data.code !== 200) {
    //   alert('请求成功，但是没有拿到数据');
    //   return false;
    // }
    // console.log(res.data);
    // console.log("响应拦截器的res",res);
    return res.data;
  },
  err => {
    // 请求失败的处理
    alert('请求失败');
    return Promise.reject(err);
  }
);

export default instance;
