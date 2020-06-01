<!--
 * @Author: your name
 * @Date: 2020-06-01 22:20:05
 * @LastEditTime: 2020-06-01 23:26:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\views\Confirm.vue
-->
<!--  -->
<template>
  <div class="layui-container flex">
    <div class="layui-row font mb20">确定更新账号为：{{username}}吗？</div>
    <div class='layui-row'>
      <button type="button" class="layui-btn" :class="{'layui-btn-disabled': isSend}" @click="submit()">确认更新</button>
      <router-link to="/" class="layui-btn layui-btn-primary">返回首页</router-link>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { updateUsername } from '@/api/user'
export default {
  name: 'confirm',
  data () {
  // 这里存放数据
    return {
      username: '',
      query: {},
      isSend: false
    }
  },
  mounted () {
    let queryStr = window.location.href.replace(/.*\?/, '')
    let obj = Object.fromEntries(queryStr.split('&').map(v => v.split('=')))
    console.log('obj', obj)
    this.username = decodeURIComponent(obj.username)
    this.query = obj
  },
  methods: {
    submit () {
      this.$set(this.query, 'username', this.username)
      updateUsername(this.query).then(res => {
        if (res.code === 200) {
          this.$alert(res.msg)
          this.isSend = true
          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.flex {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  min-height: 260px;
}
.font {
  font-size: 16px;
  color: #333;
}
</style>
