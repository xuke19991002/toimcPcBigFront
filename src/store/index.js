import Vue from 'vue'
import Vuex from 'vuex'
import { v4 as uuidv4 } from 'uuid'

Vue.use(Vuex)

// 用于获取验证码的一个id
function initSid () {
  let sid = ''
  if (localStorage.getItem('sid')) {
    sid = localStorage.getItem('sid')
  } else {
    sid = uuidv4()
    localStorage.setItem('sid', sid)
  }
  return sid
}

export default new Vuex.Store({
  state: {
    sid: initSid()
  },
  mutations: {
    // setSid(state, value){
    //   state.sid = value
    // }
  },
  actions: {
  },
  modules: {
  }
})
