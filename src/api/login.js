import axios from '@/utils/request'

export const getCodeApi = async sid => {
  return axios.get('/public/getCaptcha?sid=' + sid)
}

export const forgetApi = async option => {
  return axios.post('/login/forget', option)
}

export const loginApi = async data => {
  return axios.post('/login/login', data)
}

export const regApi = async data => {
  return axios.post('/login/reg', data)
}
