import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {} // 登录后存储用户信息
  },
  mutations: {
    setSid (state, value) {
      state.sid = value
    },
    setUserInfo (state, value) {
      state.userInfo = value.user
      state.token = value.token
      state.isLogin = true
    },
    setIsLogin (state, value) {
      state.isLogin = value
    }
  },
  actions: {

  }
})
