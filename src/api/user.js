/*
 * @Author: your name
 * @Date: 2020-05-30 20:12:30
 * @LastEditTime: 2020-07-02 22:19:16
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

// 设置收藏 & 取消收藏
const addCollect = data => axios.get('/user/set-collect?' + qs.stringify(data))

// 获取收藏列表
const getCollect = data => axios.get('/user/collect?' + qs.stringify(data))

// 获取发表的文章列表
const getPostListByUid = data => axios.get('/user/post?' + qs.stringify(data))

// 删除指定文章列表
const deletePostByUid = data => axios.get('/user/delete-post?' + qs.stringify(data))

// 获取用户收藏贴
const getCollectListByUid = data => axios.get('/user/collect-list?' + qs.stringify(data))

// 获取用户的基本信息
const getInfo = (data) => axios.get('/public/info?' + qs.stringify(data))

// 获取用户最近评论列表
const getCommentList = (data) => axios.get('/public/latest-comment?' + qs.stringify(data))

// 获取发表的文章列表
const getPostPublic = data => axios.get('/public/latest-post?' + qs.stringify(data))

export {
  userSign,
  updateUserInfo,
  updateUsername,
  resetUserPass,
  changeUserPass,
  addCollect,
  getCollect,
  getPostListByUid,
  deletePostByUid,
  getCollectListByUid,
  getInfo,
  getCommentList,
  getPostPublic
}
