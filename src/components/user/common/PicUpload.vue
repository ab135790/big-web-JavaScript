<!--
 * @Author: your name
 * @Date: 2020-05-19 21:42:49
 * @LastEditTime: 2020-06-06 22:10:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\user\common\PicUpload.vue
-->
<!-- 上传头像 -->
<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <div class="layui-form-item">
      <div class="avatar-add">
        <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>
        <label for="pic" class="layui-btn upload-img">
          <i class="layui-icon">&#xe67c;</i>上传头像
        </label>
        <input id="pic" type="file" name="file" accept="image/jpg,image/png,image/gif" @change="upload" class="input-pic">
        <img :src="pic">
        <span class="loading"></span>
      </div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { uploadImg } from '@/api/content'
import config from '@/config'
import { updateUserInfo } from '@/api/user'
export default {
  name: 'picUpload',
  data () {
  // 这里存放数据
    return {
      // 判断userinfo是否存在,并是否存在图片路径
      pic: (this.$store.state.userInfo && this.$store.state.userInfo.pic) ? this.$store.state.userInfo.pic : require('@/assets/img/default.png'),
      formData: ''
    }
  },
  methods: {
    upload (e) {
      // console.log('e', e)
      let file = e.target.files
      let formData = new FormData()
      if (file.length > 0) {
        formData.append('file', file[0])
        this.formData = formData
      }
      // 上传图片之后 -> uploadImg
      // 更新用户基本资料 -> updateUserInfo
      uploadImg(this.formData).then(res => {
        // console.log('res', res)
        if (res.code === 200) {
          const baseUrl = process.env.NODE_ENV === 'production' ? config.baseUrl.pro : config.baseUrl.dev
          this.pic = baseUrl + res.data
          updateUserInfo({ pic: this.pic }).then(res => {
            if (res.code === 200) {
              // 修改全局的store内的用户基础信息
              let user = this.$store.state.userInfo
              user.pic = this.pic
              this.$store.commit('setUserInfo', user)
            }
          })
          this.$alert(res.msg)
          document.getElementById('pic').value = ''
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.input-pic {
  display: none;
}
</style>
