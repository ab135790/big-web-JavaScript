// 封装axios的请求， 返回重新封装的数据格式
// 对错误的统一处理
import axios from 'axios';
import errorHandle from './errorHandle.js';

class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl;
  }
  // 获取axios配置
  getInsideConfig () {
    const config = {
      baseUrl: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
      // withCredentials: false, // default 是否使用凭证，常用的token
    };
    return config;
  }
  // 设定拦截器
  interceptors (instance) {
    // 发起请求的拦截器
    instance.interceptors.request.use(res => {
      // Do something before request is sent
      return res;
    }, error => {
      errorHandle(error);
      // Do something with request error
      return Promise.reject(error);
    });
    // 响应请求的拦截器
    instance.interceptors.response.use(res => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      // console.log('res is:' + JSON.stringify(res));
      if (res.status === 200) {
        return Promise.resolve(res.data);
      } else {
        return Promise.reject(res);
      }
    }, error => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      errorHandle(error);
      return Promise.reject(error);
    });
  }
  //  创建实例
  request (options) {
    const instance = axios.create();
    const newOptions = Object.assign(this.getInsideConfig(), options);
    // console.log('newOptions', JSON.stringify(newOptions));
    this.interceptors(instance);
    return instance.request(newOptions); // 就等价于 instance.request(config)，这里可以省略掉request
  }
  // get请求
  get (url, config) {
    const options = Object.assign({
      method: 'get',
      url: url
    }, config);
    return this.request(options);
  }
  // post 请求
  post (url, data) {
    return this.request({
      method: 'post',
      url: url,
      data: data
    });
  }
}

export default HttpRequest;
