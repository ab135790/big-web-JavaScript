/*
 * @Author: Mister Wang
 * @Date: 2020-06-25 17:10:52
 * @LastEditTime: 2020-06-26 21:05:28
 * @LastEditors: Please set LastEditors
 * @Description: vue的自定义指令
 * @FilePath: \big-web-JavaScript\src\utils\directives.js
 */
import { escapeHtml } from '@/utils/escapeHtml'
export default {
  'richtext': {
    bind: function (el, binding, vnode) {
      // console.log('binding', binding)
      // console.log('el', el)
      // console.log('vnode', vnode)
      el.innerHTML = escapeHtml(binding.value)
    },
    componentUpdated: function (el, binding, vnode) {
      el.innerHTML = escapeHtml(binding.value)
    }
  }
}
