import axios from 'axios'
import errorHandle from './errorHandle'

class HttpRequest {
  constructor (baseURL) {
    this.baseURL = baseURL
  }

  // 获取实例配置
  getInsideConfig () {
    const config = {
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 1000 * 10,
      withCredentials: true // 跨域请求是否携带凭证（主要指的是cookie，跨域携带cookie）
    }
    return config
  }

  // 设置拦截器
  interceptors (instance) {
    // 请求拦截器
    instance.interceptors.request.use(config => {
      return config
    }, error => {
      errorHandle(error)
      return Promise.reject(error)
    })

    // 响应拦截器
    instance.interceptors.response.use(res => {
      if (res.status === 200) {
        return res.data
      } else {
        return Promise.reject(res)
      }

      return res
    }, error => {
      errorHandle(error)
      return Promise.reject(error)
    })
  }

  request (options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(newOptions)
  }
  get(url, config){
    return this.request({
      url,
      method: 'get',
      ...config
    })
  }
  post(url, data, config){
    return this.request({
      url,
      method: 'post',
      data,
      ...config
    })
  }
}

export default HttpRequest
