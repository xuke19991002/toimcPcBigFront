import axios from '@/utils/request'
import qs from 'qs'

// 读取文章列表接口参数
export const getListApi = options => {
  return axios.get('/public/list?' + qs.stringify(options))
}

// 温馨通道
export const getTipsApi = () => {
  return axios.get('/public/tips')
}

// 友情链接
export const getLinksApi = () => {
  return axios.get('/public/links')
}

// 本周热议
export const getTopApi = () => {
  return axios.get('/public/topWeek')
}
