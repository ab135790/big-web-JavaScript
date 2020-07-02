/*
 * @Author: your name
 * @Date: 2020-06-23 22:58:24
 * @LastEditTime: 2020-06-27 21:52:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\api\comments.js
 */
import axios from '@/utils/request'
import qs from 'qs'
import store from '@/store'
// 获取文章中的评论列表
const getComments = options => {
  const token = store.state.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        'Authorization': 'Bearer ' + store.state.token
      }
    }
  }
  return axios.get('/public/comments?' + qs.stringify(options), headers)
}

// 添加评论信息
const addComment = data => axios.post('/comments/reply', { ...data })

// 更新评论信息
const updateComment = data => axios.post('/comments/update', { ...data })

// 采纳最佳评论
const setCommentBest = options => axios.get('/comments/accept?' + qs.stringify(options))

// 设置点赞
const setHands = options => axios.get('/comments/hands?' + qs.stringify(options))

export {
  getComments,
  addComment,
  updateComment,
  setCommentBest,
  setHands
}
