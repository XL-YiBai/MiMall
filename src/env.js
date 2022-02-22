// 如果基于CORS跨域或者jsonp跨域，可以配置环境变量
let baseURL;
// process.env从Node进程中获取环境变量，看NODE_ENV是开发环境，测试环境，还是上线环境，配置对应baseURL
switch (process.env.NODE_ENV) {
  case 'development':
    baseURL = 'http://dev-mall-pre.springboot.cn/api';
    break;
  case 'test':
    baseURL = 'http://test-mall-pre.springboot.cn/api';
    break;
  case 'production':
    baseURL = 'http://mall-pre.springboot.cn/api';
    break;
  default:
    baseURL = 'http://mall-pre.springboot.cn/api';
    break;
}


export default {
  baseURL
}