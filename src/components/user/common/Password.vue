<!--
 * @Author: your name
 * @Date: 2020-05-19 21:43:37
 * @LastEditTime: 2020-06-07 13:41:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\user\common\Password.vue
-->
<!-- 修改密码 -->
<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <validation-observer v-slot="{ validate }" ref="observer">
        <div class="layui-form-item">
          <label for="L_nowpass" class="layui-form-label">当前密码</label>
          <validation-provider name='password' v-slot="{ errors }" rules='required|min:6|max:16'>
            <div class="layui-input-inline">
              <input type="password" id="L_nowpass" v-model="oldPassword" autocomplete="off" placeholder='请输入密码' class="layui-input">
            </div>
            <div class='layui-row'>
              <span style='color: #c00'>{{ errors[0] }}</span>
            </div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <label for="L_pass" class="layui-form-label">新密码</label>
          <validation-provider name="password" v-slot="{ errors }" rules='required|min:6|max:16|confirmed:confirmation'>
            <div class="layui-input-inline">
              <input type="password" id="L_pass" v-model="newPassword" autocomplete="off" class="layui-input" placeholder='请输入密码'>
            </div>
            <div class="layui-form-mid layui-word-aux">6到16个字符</div>
            <div class='layui-row'>
              <span style='color: #c00'>{{ errors[0] }}</span>
            </div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <label for="L_repass" class="layui-form-label">确认密码</label>
          <validation-provider v-slot="{ errors }" vid="confirmation">
            <div class="layui-input-inline">
              <input type="password" id="L_repass" v-model="rePassword" placeholder='请输入确认密码' autocomplete="off" class="layui-input">
            </div>
            <div class='layui-row'>
              <span style='color: #c00'>{{ errors[0] }}</span>
            </div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <button class="layui-btn" @click="validate().then(_submit)">确认修改</button>
        </div>
    </validation-observer>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { changeUserPass } from '@/api/user.js'

export default {
  name: 'password',
  data () {
  // 这里存放数据
    return {
      oldPassword: '',
      newPassword: '',
      rePassword: ''
    }
  },
  components: {
    ValidationObserver,
    ValidationProvider
  },
  methods: {
    async _submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        // ABORT
        return
      }
      if (this.oldPassword === this.newPassword) {
        this.$pop('shake', '新密码和当前密码不能相同')
        return
      }
      changeUserPass({
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      }).then(res => {
        if (res.code === 200) {
          this.oldPassword = this.newPassword = this.rePassword = ''
          requestAnimationFrame(() => {
            this.$refs.observer && this.$refs.observer.reset()
          })
        }
        this.$alert(res.msg)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类

</style>
