/*
 * @Author: your name
 * @Date: 2020-05-17 16:07:29
 * @LastEditTime: 2020-06-14 20:52:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\utils\veevalidate.js
 */ 
import { extend, localize } from 'vee-validate'
import { required, email, length, confirmed, min } from 'vee-validate/dist/rules'

import zh from 'vee-validate/dist/locale/zh_CN.json'

extend('email', email)
extend('required', required)
extend('length', length)
extend('confirmed', confirmed)
extend('min', min)

localize('zn_CN', {
  messages: {
    ...zh.messages,
    required: '请输入{_field_}'
  },
  names: {
    email: '邮箱',
    password: '密码',
    name: '昵称',
    username: '账号',
    code: '验证码'
  },
  // 自定义消息
  fields: {
    email: { // 对面names下的email
      email: '请输入正确的{_field_}',
      required: '请输入{_field_}!!!'
    },
    password: {
      password: '请输入正确格式的密码{_field_}',
      required: '请输入{_field_}!!!'
    }
  }
})
