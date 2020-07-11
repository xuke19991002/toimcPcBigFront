import HttpRequest from '@/utils/axios'
const config =  require('@/config')

// const baseURL = process.env.NODE_ENV === 'production' ? config.baseURL.pro : config.baseURL.dev
// 开发环境下 baseURL 不用设置 设置请求地址 会导致webpack devServer 代理无效
// 参考链接：https://blog.csdn.net/mrzhangdulin/article/details/86165465

const baseURL = process.env.NODE_ENV === 'production' ? config.baseURL.pro : ''

const axios = new HttpRequest(baseURL)

export default axios
