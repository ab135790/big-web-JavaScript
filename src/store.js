/*
 * @Author: your name
 * @Date: 2020-05-17 16:07:29
 * @LastEditTime: 2020-05-30 20:47:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\store.js
 */
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
    setToken (state, value) {
      state.token = value
      // 本地存储用户的基本信息
      localStorage.setItem('token', value)
    },
    setUserInfo (state, value) {
      if (value === '') return
      // 本地存储用户的基本信息
      localStorage.setItem('userInfo', JSON.stringify(value))
      state.userInfo = value
    },
    setIsLogin (state, value) {
      state.isLogin = value
    }
  },
  actions: {

  }
})
