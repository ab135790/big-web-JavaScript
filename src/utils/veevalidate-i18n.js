/*
 * @Author: your name
 * @Date: 2020-05-17 16:07:29
 * @LastEditTime: 2020-06-14 21:10:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\utils\veevalidate-i18n.js
 */
import { extend, configure } from 'vee-validate'
// eslint-disable-next-line camelcase
import { required, email, min, length, confirmed, max, is_not } from 'vee-validate/dist/rules'
import { i18n } from './i18n'
// 结合vuei18n的写法
configure({
  defaultMessage: (field, values) => {
    values._field_ = i18n.t(`fields.${field}`)
    return i18n.t(`validation.${values._rule_}`, values)
  }
})

extend('email', email)
extend('min', min)
extend('max', max)
extend('required', required)
extend('length', length)
extend('confirmed', confirmed)
extend('is_not', is_not)
extend('isNumber', {
  validate (value) {
    const reg = /^[0-9]*$/
    if (!(reg.test(value))) return true
  }
})
extend('isPassword', {
  params: ['target'],
  validate (value, { target }) {
    if (value === target) return true
  }
})
