/*
 * @Author: your name
 * @Date: 2020-06-23 23:37:18
 * @LastEditTime: 2020-06-23 23:44:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\utils\filter.js
 */
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
// 显示中文
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)

const moment = (date) => {
  // 超过7天，显示日期
  if (dayjs(date).isBefore(dayjs().subtract(7, 'days'))) {
    return dayjs(date).format('YYYY-MM-DD')
  } else {
    // 1小时前，xx小时前，X天前
    return dayjs(date).locale('zh-cn').from(dayjs())
  }
}

export default {
  moment
}
