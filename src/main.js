/*
 * @Author: your name
 * @Date: 2020-05-17 16:07:29
 * @LastEditTime: 2020-06-25 18:13:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from '@/utils/filter' // 全局过滤
import directives from '@/utils/directives' // 自定义指令
// import axios from 'axios';
// import '@/utils/veevalidate';
// 结合vuei18n的写法
import '@/utils/veevalidate-i18n'
import Alert from './components/modules/alert'
import Pop from './components/modules/pop'

Vue.use(Alert)
Vue.use(Pop)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
// import './local/index';

// import VeeValidate, { Validator } from 'vee-validate'
// method1 to zh-cn
// import zh from 'vee-validate/dist/locale/zh_CN'

// method2 to zh-cn

// Vue.use(VeeValidate)
// method1 to zh-cn
// Validator.localize('zh-CN', zh)

// method2 to zh-cn
// const validator = new Validator()
// validator.localize('zh-CN')

Vue.config.productionTip = false
// axios.defaults.baseURL =
//   process.env.NODE_ENV !== 'production'
//     ? 'http://localhost:3000'
//     : 'http://192.168.27.131:12005';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
