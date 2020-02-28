import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Home.vue'
const Login = () => import(/* webpackChunkName: 'login' */ './views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ './views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ './views/Forget.vue')
const Home = () => import(/* webpackChunkName: 'Home' */ './views/Home.vue')
const Index = () => import(/* webpackChunkName: 'Index' */ './views/channels/Index.vue')
const Template1 = () => import(/* webpackChunkName: 'Template1' */ './views/channels/Template1.vue')

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'layui-this',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '',
          name: 'index',
          component: Index
        },
        {
          path: '/index/:catalog',
          name: 'catalog',
          component: Template1
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg,
      beforeEnter: (to, from, next) => {
        // console.log('TCL: next', next);
        // console.log('TCL: to', to);
        // console.log('TCL: from', from);
        if (from.name === 'login') {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget
    }
  ]
})
