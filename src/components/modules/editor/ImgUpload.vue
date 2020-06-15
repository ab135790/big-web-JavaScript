<!--
 * @Author: your name
 * @Date: 2020-06-08 21:52:04
 * @LastEditTime: 2020-06-14 22:30:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\modules\editor\ImgUpload.vue
-->
<!--  -->
<template>
  <transition name="fade">
    <div class="layui-layer-page layui-layer-border edit-content" v-show="isShow">
      <div class="layui-layer-title">插入图片</div>
      <div class="layui-layer-content">
        <ul class="layui-form layui-form-pane">
          <li class="layui-form-item">
            <label for="" class="layui-form-label">URL</label>
            <div class="layui-input-inline">
              <input type="text" id="fileInput" placeholder="粘贴图片地址或者点击上传" class="layui-input" v-model="pic" />
            </div>
            <button type="button" class="layui-btn layui-btn-primary">
              <label for="uploadImg">
                <i class="layui-icon layui-icon-upload"></i>上传图片
              </label>
              <input type="file" class="layui-upload-file" name="file" id="uploadImg" @change="upload">
            </button>
          </li>
          <li class="layui-form-item">
            <button type="button" class="layui-btn" @click="_submit()">确认</button>
          </li>
        </ul>
      </div>
      <span class="layui-layer-setwin" @click.stop="close()">
        <a href="javascript:void(0)" class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
      </span>
    </div>
  </transition>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { uploadImg } from '@/api/content'
import config from '@/config'
export default {
  name: 'ImgUpload',
  data () {
  // 这里存放数据
    return {
      pic: '',
      formData: ''
    }
  },
  props: ['isShow'],
  methods: {
    close () {
      // 清空输入内容
      this.$emit('closeEvent')
      this.pic = ''
      this.formData = ''
    },
    upload (e) {
      let file = e.target.files
      let formData = new FormData()
      if (file.length > 0) {
        formData.append('file', file[0])
        this.formData = formData
      }
      // 上传图片
      uploadImg(this.formData).then(res => {
        if (res.code === 200) {
          const baseUrl = process.env.NODE_ENV === 'production' ? config.baseUrl.pro : config.baseUrl.dev
          this.pic = baseUrl + res.data
        }
      })
      // 清空图片文件
      document.getElementById('uploadImg').value = ''
    },
    _submit () {
      if (this.pic === '') {
        document.getElementById('fileInput').focus()
        this.$pop('shake', '请上传图片或者复制图片链接')
        return
      }
      this.$emit('addEvent', this.pic)
      setTimeout(() => {
        this.close()
      }, 0)
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.layui-form-item {
  text-align: center;
}
.layui-form-pane {
  margin: 20px;
}
</style>
