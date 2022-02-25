import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import App from './App.vue'
// import env from './env'

// mock开关
const mock = false;
if (mock) {
  // 这里不能在顶部用import引入，因为import是预编译加载，这样发请求就永远被拦截，我们希望mock开关关闭时不被拦截
  require('./mock/api');
}

// 根据前端的跨域方式做调整(这里用接口代理的方式) 向/a/b发请求，会变成向/api/a/b，之后通过接口代理配置去掉/api => /a/b
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000; // 超时时间
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL;

// 响应拦截器，做接口错误拦截
axios.interceptors.response.use(function(response) {
  // 获取接口返回值
  let res = response.data;
  // 和后端协调：status为0表示正确
  if (res.status == 0) {
    return res.data;
  } else if(res.status == 10) { // 没登陆时接口报错，status为10
    // 没有登录的话就跳转到登录页面
    window.location.href = '/#/login';
  } else { // 其他错误，弹出错误信息
    alert(res.msg);
    // 返回一个失败的Promise，避免发axios发生错误时进入then()方法中成功的回调
    return Promise.reject(res); 
  }
})

Vue.prototype.axios = axios;

Vue.use(VueCookie);
Vue.use(VueLazyload, {
  loading: '/imgs/loading-svg/loading-bars.svg'
});
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
