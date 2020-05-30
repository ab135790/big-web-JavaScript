/*
 * @Author: Mister Wang
 * @Date: 2020-05-30 21:23:58
 * @LastEditTime: 2020-05-30 21:27:38
 * @LastEditors: Please set LastEditors
 * @Description: Pop组件
 * @FilePath: \big-web-JavaScript\src\components\modules\alert\pop\index.js
 */
import PopComponent from './Pop.vue'

const Pop = {}

Pop.install = Vue => {
  // 注册Pop组件
  const PopConstructor = Vue.extend(PopComponent)
  const instance = new PopConstructor()
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  // 添加实例方法，以供全局进行调用
  Vue.prototype.$pop = (type, msg) => {
    instance.type = type
    instance.msg = msg
    instance.isShow = true
  }
}

export default Pop
