import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import axios from 'axios';
// import '@/utils/veevalidate';
// 结合vuei18n的写法
import '@/utils/veevalidate-i18n'
import Alert from './components/modules/alert'

Vue.use(Alert)
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
