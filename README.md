# vant-app

## 2022 年 5 月 22 日 第一天

1. 安装 vantui 以及配置（查看官网）

2. 搜索框的编写

3. rem 设置和重置 css 样式

4. 设置根元素字体大小（rem单位换算）(yarn add reset-**css**)

5. 轮播图的编写

6. 点击搜索框跳到另一个组件，路由的跳转

- 路由配置
- 组件间的过渡（Vue.js 提供和 vantui 的）
  > Vue.js 提供的 https: //cn.vuejs.org/v2/guide/transitions.html#ad
  > vant ui 提供的

6. popup 界面的历史热门完成

7. 搜索提示页面



## 整个点击搜索到搜索结果的完成



### 首页点击搜索框遮罩层以及动画

思路分析：

1. 需要在首页准备好这个遮罩层
2. 当点击跳转到历史和热门的搜索页面时，通过v-show要显示这个遮罩层，并且伴有过渡效果（可以根据vant自带的）
3. 当在历史和热门的搜索页面，想要回退到首页的时候，要对这个遮罩层隐藏
4. 数组因为在不同组件用，放到vuex中

```less
// Vue的过渡效果的写法：(注意事项，在过渡盒子身上不要书写这个过渡属性)

// 进入过渡的初始状态，以及离开过渡的结束状态
// slice 是在 transition 标签的name
.slice-enter,
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
}
```

> 如果在点击取消那里去修改是否显示的值，会有bug，用户不是通过点击取消按钮返回到主页面这是遮罩层是并没有被隐藏的，所有不能直接只在点击取消按钮去改这一个值，可以通过监听路由的方式（只适合父子切换），达到效果。

```js
watch: {
    // 监听路由 不是路由守卫 只是用来监听 父子级关系的路由切换，只有父子级触发
    $route(to, from) {
      // console.log(to, from);
      if (to.name == 'home') {
        this.hdIsShowShadow(false);
      }
    },
},
```



### 搜索栏下方三个区域的展示

搜索栏下方其实有3个状态

1、历史记录和热门搜索

2、搜索列表

3、搜索出来的产品内容

> 这三个组件如何进行切换：
>
> 1. 可以定义一个blockShow变量，1 就对应历史记录和热门搜索，2 就对应搜索列表，3 就对应搜索出来的产品内容
> 2. v-if 、v-else-if通过判断blockShow的值确实能够否显示对应的组件

```vue
<HistoryHot v-if="blockShow==1" />
<SearchTipsList v-else-if="blockShow==2" />
```



### 搜索提示列表

> 在用户输入时触发，并且发送请求，所以要进行父传子的传值。相对比较容易



### 搜索产品展示区块处理

> 回车后显示搜索产品的展示，这里可以多写一个产品的组件，因为可以复用。

> ！！！这一部分主要是难在因为使用了ui框架，数据的格式要按照ui框架的这样来处理，所以这时候需要对后端返回的数据进行处理才能跟ui的组件打好配合。不好在这里演示，去看项目



总结：这种ui框架 还是注意看他文档有什么属性我们是可以去利用的，或者都是什么意思，方便开发





## 2022 年 5 月 25 日 第四天



> views 一般放一整个页面，然后 components 那里是放页面的一小块部分

### 首页弹框之后看见底层页面的问题

> 思路：
>
> 给弹出影响其他页面显示的内容套一个div ，v-show通过路径的值来决定是否展示，为了避免即刻消失，外加一个transition 解决立刻消失的问题



### 处理后端返回数据的一些技巧

> 总结经验：有时候，后端给我们的数据跟我们需要的格式有点不一样，我们就需要把后端给我们的数据处理成我们想要的数据

```js
// 1. 使用map处理修改数组中的多个对象的属性名
// 比如：[{value:'吃饭',id:111}]  变成 [{name:'吃饭',value:111}]
let newArr = arr.map(item=>{
    return { name : item.value, value : item.id }
})

// 2. 使用JSON.stringify序列化变成JSON字符串，替换想替换的，然后再反序列化JSON.parse变成原来的
JSON.parse(JSON.stringify(data).replace(/name1/g, 'new_name1').replace(/name2/g, 'new_name2').replace(/name3/g, 'new_name3')...)
// replace可以重复链式编程，name1表示旧属性名，new_name表示新属性名
```





### 路由守卫的设置

> 全局前置路由守卫：在跳转路由前执行（其他后置的了解）
>
> 组件内的路由守卫：写在组件内部Vue给我们提供的api
> 官网：[导航守卫 | Vue Router (vuejs.org)](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)

全局前置路由守卫

```js
// 配置简单的全局登录的路由守卫

// 全局路由守卫/路由拦截 能够在每一次跳转路由之前拦截下来 做一定的逻辑处理

router.beforeEach((to, from, next) => {
  // 什么时候执行这个函数 当有路由发生跳转的时候
  // to : 要去往的路由对象  里面有path name等属性
  // from ： 从哪里出发的这个路由对象
  // next() 表示可以通行
  console.log('to', to);
  console.log('from', from);

  // 如果写在全局守卫就相当于不去购物车的页面 也会进行路由跳转 这样会浪费资源 所以最好把他写在组件内部
  // 判断是不是要进入购物车
  if (to.path == '/cart') {
    // 查看是否登录;
    let token = localStorage.getItem('token1');
    if (token) {
      next();
    } else {
      // 没有登录就调到用户界面
      setTimeout(() => {
        // 这是vant ui 的$toast
        Vue.prototype.$toast.success('请先登录');
        next('/user');
      }, 800);
    }
    return;
  }
  next();
});
```

组件内的路由守卫

```js
// 组件内的路由守卫
  beforeRouteEnter(to, from, next) {
    // 查看是否登录;
    let token = localStorage.getItem('token1');
    if (!token) {
      // 没有登录就调到用户界面
      setTimeout(() => {
        // 不能获取组件实例 `this` ！
        // 因为当守卫执行时，组件实例还没被创建！
        Vue.prototype.$toast.success('请先登录');
        next('/user');
      }, 800);
      return;
    }
    next();
  },
```

监听路由

```js
watch: {
    // 监听路由 不是路由守卫 只是用来监听 父子级关系的路由切换，只有父子级触发
    $route(to, from) {
      // console.log(to, from);
      if (to.name == 'home') {
        this.hdIsShowShadow(false);
      }
    },
},
```





> 报错：Redirected when going from "/category" to "/cart" via a navigation guard.
>
> VUE路由全局守卫 报错
>
> vue-router版本过高
>
> 这个的意思是在router 包升级后 login页面在跳转的时候抛出了一个promise异常 没有接收它 所以报了这个错误
>
> 使用路由重定向做了登录验证后, 报错
>
> Error: Redirected when going from “/about” to “/cart” via a navigation guard.
>
> 是因为router的版本问题 和vue/lic有冲突
> ————————————————
> 版权声明：本文为CSDN博主「胖就是胖」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
> 原文链接：https://blog.csdn.net/xieyuleisss/article/details/113615857

解决：

```js
// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
```



## 2022 年 5 月 26 日 第五天
