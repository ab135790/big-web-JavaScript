/*
 * @Author: your name
 * @Date: 2020-05-17 16:07:29
 * @LastEditTime: 2020-07-12 20:30:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\store.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import WebSocketClient from './utils/websocket'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    token: '',
    isHide: false,
    userInfo: null, // 登录后存储用户信息
    num: 0
  },
  mutations: {
    initWebSocket (state, config) {
      state.ws = new WebSocketClient(config)
      state.ws.init()
    },
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
    },
    setMessage (state, value) {
      state.num = value.message ? value.message : 0
    }
  },
  actions: {
    message ({ commit }, msg) {
      commit('setMessage', msg)
    }
  }
})
