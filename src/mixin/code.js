/*
 * @Author: your name
 * @Date: 2020-06-07 17:15:48
 * @LastEditTime: 2020-06-07 17:20:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\mixin\code.js
 */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { getCode } from '@/api/login'
import { v4 as uuid } from 'uuid'

export default {
  data () {
    return {
      code: '',
      svg: ''
    }
  },
  mounted () {
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('setSid', sid)
    this._getCode()
  },
  methods: {
    _getCode () {
      let sid = this.$store.state.sid
      // console.log('sid', sid)
      getCode(sid).then(res => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  }
}
