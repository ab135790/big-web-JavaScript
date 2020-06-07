/*
 * @Author: your name
 * @Date: 2020-05-30 20:12:30
 * @LastEditTime: 2020-06-06 15:58:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\api\user.js
 */
import axios from '@/utils/request'
import qs from 'qs'
// 用户签到
const userSign = () => axios.get('/user/fav')

// 更新用户基本资料
const updateUserInfo = data => axios.post('/user/basic', data)

// 确认修改用户名
const updateUsername = data => axios.get('/public/reset-email?' + qs.stringify(data))

// 重置用户密码
const resetUserPass = data => axios.post('/public/resetPass', data)

// 修改密码
const changeUserPass = data => axios.post('/user/changePass', data)

export {
  userSign,
  updateUserInfo,
  updateUsername,
  resetUserPass,
  changeUserPass
}
