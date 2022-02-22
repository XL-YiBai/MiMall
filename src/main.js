import Vue from 'vue'
import router from './router'
import axios from 'axios'
import App from './App.vue'
import env from './env'

// 根据前端的跨域方式做调整(这里用接口代理的方式) 向/a/b发请求，会变成向/api/a/b，之后通过接口代理配置去掉/api => /a/b
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000; // 超时时间
// 根据环境变量获取不同的请求地址
axios.defaults.baseURL = env.baseURL;

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
  }
})

Vue.prototype.axios = axios;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
