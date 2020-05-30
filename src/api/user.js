/*
 * @Author: your name
 * @Date: 2020-05-30 20:12:30
 * @LastEditTime: 2020-05-30 21:36:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\api\user.js
 */
import axios from '@/utils/request'

// 用户签到
const userSign = () => axios.get('/user/fav')

export {
  userSign
}
