<!--
 * @Author: your name
 * @Date: 2020-05-19 21:41:31
 * @LastEditTime: 2020-06-01 23:31:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\user\common\Myinfo.vue
-->
<!-- 修改信息 -->
<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
  <validation-observer ref="observer" v-slot='{ validate }'>
    <div class="layui-form-item">
      <label for="L_email" class="layui-form-label">邮箱</label>
      <validation-provider v-slot='{ errors }' rules='required|email' name="email">
        <div class="layui-input-inline">
          <input
          v-model="username"
          type="text"
          autocomplete='off'
          name="username"
          class="layui-input">
        </div>
        <div class='layui-form-mid'>
          <span style='color: #c00'>{{ errors[0] }}</span>
        </div>
      </validation-provider>
      <!-- <div class="layui-form-mid layui-word-aux">如果您在邮箱已激活的情况下，变更了邮箱，需<a href="activate.html" style="font-size: 12px; color: #4f99cf;">重新验证邮箱</a>。</div> -->
    </div>
    <div class="layui-form-item">
      <label for="L_username" class="layui-form-label">昵称</label>
      <validation-provider v-slot='{ errors }' rules='required' name="name">
        <div class="layui-input-inline">
          <input
          v-model="name"
          type="text"
          name="name"
          class="layui-input">
        </div>
        <div class='layui-form-mid'>
          <span style='color: #c00'>{{ errors[0] }}</span>
        </div>
      </validation-provider>
    </div>
    <div class="layui-form-item">
      <label for="L_city" class="layui-form-label">城市</label>
      <div class="layui-input-inline">
        <input type="text" v-model="location" name="city" class="layui-input">
      </div>
    </div>
    <div class="layui-form-item">
      <label for="L_gender" class="layui-form-label">性别</label>
      <div class="layui-input-inline gray ml10 mt10">
        <label for="gender1" class="custom2 mr10"><input id="gender1" v-model="gender" type="radio" name="sex" value="0" title="男"><i class="layui-icon layui-icon-circle mr10" :class="{'layui-icon-radio': gender === '0'}"></i>男</label>
        <label for="gender2" class="custom2">
          <input id="gender2" v-model="gender" type="radio" name="sex" value="1" title="女"><i class="layui-icon layui-icon-circle mr10" :class="{'layui-icon-radio': gender === '1'}"></i>女
        </label>
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label for="L_sign" class="layui-form-label">签名</label>
      <div class="layui-input-block">
        <textarea placeholder="随便写些什么刷下存在感" name="sign" v-model="regmark" class="layui-textarea" style="height: 80px;"></textarea>
      </div>
    </div>
    <div class="layui-form-item">
      <button class="layui-btn" @click='validate().then(_submit)'>确认修改</button>
    </div>
  </validation-observer>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { updateUserInfo } from '@/api/user.js'
export default {
  name: 'myinfo',
  data () {
  // 这里存放数据
    return {
      username: '',
      name: '',
      location: '',
      regmark: '',
      gender: '0'
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted () {
    let { username, name, location, gender, regmark } = this.$store.state.userInfo
    this.username = username || ''
    this.name = name || ''
    this.location = location || ''
    this.gender = gender || ''
    this.regmark = regmark || ''
  },
  methods: {
    async _submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        // ABORT
        return
      }
      updateUserInfo({
        username: this.username,
        name: this.name,
        location: this.location,
        regmark: this.regmark,
        gender: this.gender
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setUserInfo', {
            ...this.$store.state.userInfo,
            ...{
              username: this.username,
              name: this.name,
              location: this.location,
              regmark: this.regmark,
              gender: this.gender
            }
          })
          this.$alert('更新成功!')
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.layui-icon-radio {
  color: #5fb878;
}
</style>
