/*
 * @Author: your name
 * @Date: 2020-05-17 16:07:29
 * @LastEditTime: 2020-07-02 22:55:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\router.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import jwt from 'jsonwebtoken'
import moment from 'dayjs'
// import Home from '@/views/Home.vue'
const Login = () => import(/* webpackChunkName: 'login' */ './views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ './views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ './views/Forget.vue')
const Home = () => import(/* webpackChunkName: 'Home' */ './views/Home.vue')
const Index = () => import(/* webpackChunkName: 'Index' */ './views/channels/Index.vue')
const Template1 = () => import(/* webpackChunkName: 'Template1' */ './views/channels/Template1.vue')
const Center = () => import(/* webpackChunkName: 'cener' */ './views/Center.vue')
const userCenter = () => import(/* webpackChunkName: 'userCenter' */ '@/components/user/Center.vue')
const userOthers = () => import(/* webpackChunkName: 'userOthers' */ '@/components/user/Others.vue')
const userPosts = () => import(/* webpackChunkName: 'userPosts' */ '@/components/user/Posts.vue')
const userSettings = () => import(/* webpackChunkName: 'userSettings' */ '@/components/user/Settings.vue')
const userMsg = () => import(/* webpackChunkName: 'Msg' */ '@/components/user/Msg.vue')
const User = () => import(/* webpackChunkName: 'User' */ './views/User.vue')
const Accounts = () => import(/* webpackChunkName: 'Accounts' */ '@/components/user/common/Accounts.vue')
const Myinfo = () => import(/* webpackChunkName: 'Myinfo' */ '@/components/user/common/Myinfo.vue')
const Password = () => import(/* webpackChunkName: 'Password' */ '@/components/user/common/Password.vue')
const PicUpload = () => import(/* webpackChunkName: 'PicUpload' */ '@/components/user/common/PicUpload.vue')
const MyPost = () => import(/* webpackChunkName: 'MyPost' */ '@/components/user/common/MyPost.vue')
const MyCollection = () => import(/* webpackChunkName: 'MyCollection' */ '@/components/user/common/MyCollection.vue')
const NoFound = () => import(/* webpackChunkName: 'NoFound' */ '@/views/NoFound.vue')
const Confirm = () => import(/* webpackChunkName: 'Confirm' */ '@/views/Confirm.vue')
const Reset = () => import(/* webpackChunkName: 'Reset' */ '@/views/Reset.vue')
const Add = () => import(/* webpackChunkName: 'Add' */ '@/components/contents/Add.vue')
const Edit = () => import(/* webpackChunkName: 'Edit' */ '@/components/contents/Edit.vue')
const Detail = () => import(/* webpackChunkName: 'Detail' */ '@/components/contents/Detail.vue')

Vue.use(Router)

const router = new Router({
  linkExactActiveClass: 'layui-this',
  routes: [
    {
      path: '/',
      // name: 'home',
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
      path: '/confirm',
      name: 'confirm',
      component: Confirm
    },
    {
      path: '/reset',
      name: 'reset',
      component: Reset
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
      component: Forget,
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
      path: '/add',
      name: 'add',
      meta: { requiresAuth: true },
      component: Add
    },
    {
      path: '/edit/:tid',
      props: true,
      name: 'edit',
      meta: { requiresAuth: true },
      component: Edit,
      beforeEnter (to, from, next) {
        if (['detail', 'myPost'].indexOf(from.name) !== -1 && to.params.page && to.params.page.isEnd === '0') {
          next()
        } else {
          // 用户在edit页面刷新的情况
          const editData = localStorage.getItem('editData')
          if (editData && editData !== '') {
            const editObj = JSON.parse(editData)
            if (editObj.isEnd === '0') {
              next()
            } else {
              next('/')
            }
          } else {
            next('/')
          }
        }
      }
    },
    {
      path: '/detail/:tid',
      name: 'detail',
      props: true,
      component: Detail
    },
    {
      path: '/user/:uid',
      name: 'user',
      props: true,
      component: User
    },
    {
      path: '/center',
      name: 'center',
      meta: { requiresAuth: true },
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
          // name: 'user-settings',
          component: userSettings,
          children: [
            {
              path: 'Accounts',
              name: 'accounts',
              component: Accounts
            },
            {
              path: '',
              name: 'myinfo',
              component: Myinfo
            },
            {
              path: 'Password',
              name: 'password',
              component: Password
            },
            {
              path: 'PicUpload',
              name: 'picUpload',
              component: PicUpload
            }
          ]
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
          // name: 'user-posts',
          component: userPosts,
          children: [
            {
              path: '',
              name: 'myPost',
              component: MyPost
            },
            {
              path: 'MyCollection',
              name: 'myCollection',
              component: MyCollection
            }
          ]
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: NoFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
// 注册全局前置守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token !== null) {
    const payload = jwt.decode(token) // 解码jwt数据
    // 如果当前时间是在过期时间之前的，说明没有过期
    if (moment().isBefore(moment(payload.exp * 1000))) {
      // localStorage里面的缓存用户信息 + token信息
      // 大公司8-24小时，refresh token 1个月
      store.commit('setToken', token)
      store.commit('setUserInfo', userInfo)
      store.commit('setIsLogin', true)
    } else {
      localStorage.clear()
    }
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isLogin = store.state.isLogin
    if (isLogin) {
      // 已经登录的状态
      // 权限判断， meta元数据
      next()
    } else {
      // 未登录的状态
      next('/login')
    }
  } else {
    // 公共页面，不需要登录
    next()
  }
})

export default router
