<!--
 * @Author: your name
 * @Date: 2020-06-01 22:20:23
 * @LastEditTime: 2020-06-07 17:38:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\views\Reset.vue
-->
<!--  -->
<template>
  <!-- 重置密码 -->
  <div class="layui-container">
    <div class="fly-msg">{{username}}，请重置您的密码</div>
      <div class="layui-form layui-form-pane"  style="margin-top: 30px">
        <validation-observer ref='observer' v-slot='{ validate }'>
          <div class="layui-form-item">
            <label for="L_pass" class="layui-form-label">密码</label>
            <validation-provider name='password' rules='required|min:6|max:16|isPassword:@repassword' v-slot='{ errors }'>
              <div class="layui-input-inline">
                <input type="password" id="L_pass" name="password" v-model='password' autocomplete="off" class="layui-input">
              </div>
              <div class="layui-form-mid layui-word-aux">6到16个字符</div>
              <div class='layui-row'>
                <span style='color: #c00'>{{ errors[0] }}</span>
              </div>
            </validation-provider>
          </div>
          <div class="layui-form-item">
            <label for="L_repass" class="layui-form-label">确认密码</label>
            <validation-provider name='repassword' v-slot='{ errors }'>
              <div class="layui-input-inline">
                <input
                  type='password'
                  name='repassword'
                  v-model='repassword'
                  placeholder='请再次输入密码'
                  autocomplete='off'
                  class='layui-input'
                />
              </div>
              <div class='layui-row'>
                <span style='color: #c00'>{{ errors[0] }}</span>
              </div>
            </validation-provider>
          </div>
          <div class="layui-form-item">
            <label for="code" class="layui-form-label">人类验证</label>
            <validation-provider name="code" rules="required|length:4" v-slot="{ errors }">
              <div class="layui-input-inline">
                <input type="text" id="code" v-model="code" name="code" placeholder="请回答后面的问题" autocomplete="off" class="layui-input">
              </div>
              <div class="layui-form-mid">
                <span style="color: #c00" class="svg" @click='_getCode()' v-html='svg'></span>
              </div>
              <div class='layui-row'>
                <span style='color: #c00'>{{ errors[0] }}</span>
              </div>
            </validation-provider>
          </div>
          <div class="layui-form-item">
            <!-- <input type="hidden" name="username" value="{{d.username}}">
            <input type="hidden" name="email" value="{{d.email}}"> -->
            <button class="layui-btn" type="button" @click='validate().then(_submit)'>提交</button>
          </div>
        </validation-observer>
      </div>
      <div class="fly-error">该重置密码链接已失效，请重新校验您的信息</div>
      <div class="fly-error">非法链接，请重新校验您的信息</div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import codeMix from '@/mixin/code'
import { resetUserPass } from '@/api/user'
export default {
  name: 'reset',
  mixins: [codeMix],
  data () {
  // 这里存放数据
    return {
      password: '',
      repassword: '',
      username: '',
      query: {}
    }
  },
  mounted () {
    let queryStr = window.location.href.replace(/.*\?/, '')
    let obj = Object.fromEntries(queryStr.split('&').map(v => v.split('=')))
    this.username = decodeURIComponent(obj.username)
    this.query = obj
  },
  methods: {
    async _submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        // ABORT
        return
      }
      await resetUserPass({
        code: this.code,
        password: this.password,
        key: this.query.key,
        sid: this.$store.state.sid,
        username: decodeURIComponent(this.query.username)
      }).then(res => {
        if (res.code === 200) {
          this.$alert(res.msg)
          requestAnimationFrame(() => {
            this.$refs.observer && this.$refs.observer.reset()
          })
          this.$router.push('/login')
        } else {
          this.$alert(res.msg)
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
</style>
