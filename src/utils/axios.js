import axios from 'axios'
import errorHandle from './errorHandle'

const CancelToken = axios.CancelToken

class HttpRequest {
  constructor (baseURL) {
    this.baseURL = baseURL

    // 用来存储用户发送的一些历史的请求 当用户每次发起请求的时候我们在请求拦截器中去判断这个对象中是否存在同一次请求
    // 如果有就把他取消掉 没有就正常的执行
    this.pending = {}
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

  // 清除的是相同的未响应的请求
  removePending(key, isRequest = false){
    if(this.pending[key] && isRequest){
      // 当上一次请求未响应式 再一次发送请求时 会把上一次请求中断掉 并把本次自定义错误信息 放入reject(err)中
      // Cancel {message: "取消重复的请求"}
      this.pending[key]('取消重复的请求')
    }
    delete this.pending[key]
  }

  // 设置拦截器
  interceptors (instance) {
    // 请求拦截器
    instance.interceptors.request.use(config => {
      // 设置CancelToken 取消重复请求
      let key = config.url + '&' + config,method
      this.removePending(key, true)
      config.cancelToken = new CancelToken(c => { // c => 取消函数的形参 实际上对应的是这个取消函数
        // 一个请求的取消函数 对应着一次请求
        // 执行取消函数 才能取消本次请求 存储本次请求对应的取消函数 保证每次请求是唯一的 这样才能判断是否存在重复请求
        this.pending[key] = c
      })
      return config
    }, error => {
      errorHandle(error)
      return Promise.reject(error)
    })

    // 响应拦截器
    instance.interceptors.response.use(res => {
      // 请求完毕 要把本次请求存储在pending对象中的相关数据清除掉 防止内存溢出 也防止正常请求也被拦截取消掉
      let key = res.config.url + '&' + res.config.method
      this.removePending(key)

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
