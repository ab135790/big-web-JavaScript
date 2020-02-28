import axios from '@/utils/request'
import qs from 'qs'

/** 2020-2-21 0021
 *作者:青型科技
 *功能: 获取文章列表
 *参数: {Object} options: 读取文章列表接口参数
 */
const getList = options => {
  return axios.get('/public/list?' + qs.stringify(options))
}
// 获取温馨提醒接口
const getTips = () => {
  return axios.get('/public/tips')
}
// 获取本周热议
const getTop = () => {
  return axios.get('/public/topWeek')
}
// 获取友情链接接口
const getLinks = () => {
  return axios.get('/public/links')
}
export {
  getList,
  getTips,
  getLinks,
  getTop
}
