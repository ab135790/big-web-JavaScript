import axios from '@/utils/request'

/** 2020-2-15 0015
 *作者:青型科技
 *功能: 图形验证码
 *参数: {sid: uuid码}
 */
const getCode = (sid) => {
  // 等价于 axios.request({
  //    method: 'get',
  //    url: '/getCaptcha'
  // })
  return axios.get('/public/getCaptcha', {
    params: {
      sid: sid
    }
  })
}
/** 2020-2-15 0015
 *作者:青型科技
 *功能: 忘记密码
 *参数: {option: 用户信息、邮箱、验证码}
 */
const forget = option => {
  return axios.post('/login/forget', {
    ...option
  })
}
/** 2020-2-15 0015
 *作者:青型科技
 *功能: 登录
 *参数: {loginInfo: 用户登录信息}
 */
const login = loginInfo => {
  return axios.post('/login/login', {
    ...loginInfo
  })
}

/** 2020-2-15 0015
 *作者:青型科技
 *功能: 注册
 *参数: {regInfo: 用户注册信息}
 */
const reg = regInfo => {
  return axios.post('/login/reg', {
    ...regInfo
  })
}

export { getCode, forget, login, reg }
