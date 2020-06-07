<!--
 * @Author: your name
 * @Date: 2020-06-07 14:41:50
 * @LastEditTime: 2020-06-07 20:23:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\modules\editor\index.vue
-->
<!--  -->
<template>
<div class='edit-wrap'>
  <div class="layui-form-item layui-form-text">
    <div class="layui-input-block">
      <div class="layui-unselect fly-edit">
        <!-- 表情 -->
        <span @click="() => this.faceStatus = !this.faceStatus">
          <i class="iconfont icon-yxj-expression" ref="face"></i>
        </span>
        <!-- 图片 -->
        <span>
          <i class="layui-icon layui-icon-picture-fine"></i>
        </span>
        <!-- 链接 -->
        <span>
          <i class="layui-icon layui-icon-link"></i>
        </span>
        <!-- 引用 -->
        <span class="quote">
          "
        </span>
        <!-- 插入 -->
        <span>
          <i class="layui-icon layui-icon-fonts-code"></i>
        </span>
        <!-- hr -->
        <span>
          hr
        </span>
        <!-- 插入 -->
        <span>
          <i class="iconfont icon-yulan1"></i>
        </span>
      </div>
      <textarea name="content" class="layui-textarea fly-editor"></textarea>
    </div>
  </div>
  <face :isShow="faceStatus" @addEvent="addEvent" :ctrl="this.$refs.face" @closeEvent="() => this.faceStatus = false"></face>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import Face from './Face'
export default {
  name: 'Editor',
  data () {
  // 这里存放数据
    return {
      faceStatus: false
    }
  },
  components: {
    Face
  },
  methods: {
    addEvent (item) {
      console.log('item', item)
    }
  }
}
</script>
<style lang='scss'>
// @import url(); 引入公共css类
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5)
  }
  100% {
    opacity: 1;
    transform: scale(1)
  }
}
@keyframes bounceOut {
  0% {
    transform: scale(1)
  }
  30% {
    transform: scale(1.05)
  }
  100% {
    opacity: 0;
    transform: scale(0.7)
  }
}
.fade-leave-active {
  animation: bounceOut .3s;
}
.fade-enter-active,
.fade-enter-to {
  animation: bounceIn .3s;
}
.fly-editor {
  height: 260px;
}
.quote {
  font-size: 22px;
  vertical-align: middle;
  position: relative;
  top: 4px;
}
.edit-wrap {
  position: relative;
}
</style>
