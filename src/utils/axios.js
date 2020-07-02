/*
 * @Author: your name
 * @Date: 2020-05-17 16:07:29
 * @LastEditTime: 2020-06-27 20:58:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\utils\axios.js
 */
// 封装axios的请求， 返回重新封装的数据格式
// 对错误的统一处理
import axios from 'axios'
import errorHandle from './errorHandle.js'
import store from '@/store'
import PublicConfig from '@/config'

const CancelToken = axios.CancelToken

class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
    this.pending = {}
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
    }
    return config
  }
  // 请求完成，初始化this.pending
  removePending (key, isRequest = false) {
    // console.log('key', key, this.pending[key], this.pending)
    if (this.pending[key] && isRequest) {
      this.pending[key]('取消重复请求')
    } else {
      delete this.pending[key]
    }
  }
  // 设定拦截器
  interceptors (instance) {
    // 发起请求的拦截器
    instance.interceptors.request.use(config => {
      let isPublic = false
      // 判断是否是私有路径!
      PublicConfig.publicPath.map(path => {
        isPublic = isPublic || path.test(config.url)
      })
      const token = store.state.token
      // 如果是私有路径请求头部header就加token
      if (!isPublic && token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      // Do something before request is sent
      let key = config.url + '&' + config.method
      this.removePending(key, true)
      config.cancelToken = new CancelToken(c => {
        // console.log('this.pending[key]', this.pending[key])
        this.pending[key] = c
        // console.log('c', c, 'this.pending[key]', this.pending[key])
      })
      return config
    }, error => {
      errorHandle(error)
      // Do something with request error
      return Promise.reject(error)
    })
    // 响应请求的拦截器
    instance.interceptors.response.use(res => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      // console.log('res is:' + JSON.stringify(res))
      let key = res.config.url + '&' + res.config.method
      this.removePending(key)
      if (res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res)
      }
    }, error => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      // errorHandle(error)
      return Promise.reject(error)
    })
  }
  //  创建实例
  request (options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance.request(newOptions) // 就等价于 instance.request(config)，这里可以省略掉request
  }
  // get请求
  get (url, config) {
    const options = Object.assign({
      method: 'get',
      url: url
    }, config)
    // console.log('options', options)
    return this.request(options)
  }
  // post 请求
  post (url, data) {
    return this.request({
      method: 'post',
      url: url,
      data: data
    })
  }
}

export default HttpRequest
