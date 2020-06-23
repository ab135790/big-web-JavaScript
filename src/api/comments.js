/*
 * @Author: your name
 * @Date: 2020-06-23 22:58:24
 * @LastEditTime: 2020-06-23 23:11:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\api\comments.js
 */
import axios from '@/utils/request'

// 获取文章中的评论列表
const getComents = tid => axios.get('/public/comments?tid=' + tid)

export {
  getComents
}
