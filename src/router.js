/*
 * @Author: your name
 * @Date: 2020-05-17 16:07:29
 * @LastEditTime: 2020-05-18 22:35:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\router.js
 */
import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Home.vue'
const Login = () => import(/* webpackChunkName: 'login' */ './views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ './views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ './views/Forget.vue')
const Home = () => import(/* webpackChunkName: 'Home' */ './views/Home.vue')
const Index = () => import(/* webpackChunkName: 'Index' */ './views/channels/Index.vue')
const Template1 = () => import(/* webpackChunkName: 'Template1' */ './views/channels/Template1.vue')
const Center = () => import(/* webpackChunkName: 'cener' */ './views/Center.vue')
const userCenter = () => import(/* webpackChunkName: 'Center' */ '@/components/user/Center.vue')
const userOthers = () => import(/* webpackChunkName: 'Others' */ '@/components/user/Others.vue')
const userPosts = () => import(/* webpackChunkName: 'Posts' */ '@/components/user/Posts.vue')
const userSettings = () => import(/* webpackChunkName: 'Settings' */ '@/components/user/Settings.vue')
const userMsg = () => import(/* webpackChunkName: 'Msg' */ '@/components/user/Msg.vue')
const User = () => import(/* webpackChunkName: 'User' */ './views/User.vue')
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
    },
    {
      path: '/user:uid',
      name: 'user',
      props: true,
      component: User
    },
    {
      path: '/center',
      name: 'center',
      linkActiveClass: 'layui-this',
      component: Center,
      children: [
        {
          path: 'center',
          name: 'user-center',
          component: userCenter
        },
        {
          path: 'settings',
          name: 'user-settings',
          component: userSettings
        },
        {
          path: 'others',
          name: 'user-others',
          component: userOthers
        },
        {
          path: 'msg',
          name: 'user-msg',
          component: userMsg
        },
        {
          path: 'posts',
          name: 'user-posts',
          component: userPosts
        }
      ]
    }
  ]
})
