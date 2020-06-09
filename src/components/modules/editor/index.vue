<!--
 * @Author: your name
 * @Date: 2020-06-07 14:41:50
 * @LastEditTime: 2020-06-09 23:41:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\modules\editor\index.vue
-->
<!--  -->
<template>
<div class='edit-wrap'>
  <div class="layui-form-item layui-form-text">
    <div class="layui-input-block">
      <div class="layui-unselect fly-edit" ref="icons">
        <!-- 表情 -->
        <span @click="choose(0)">
          <i class="iconfont icon-yxj-expression"></i>
        </span>
        <!-- 图片 -->
        <span  @click="choose(1)">
          <i class="layui-icon layui-icon-picture-fine"></i>
        </span>
        <!-- 链接 -->
        <span @click="choose(2)">
          <i class="layui-icon layui-icon-link"></i>
        </span>
        <!-- 引用 -->
        <span class="quote" @click="choose(3)">
          "
        </span>
        <!-- 插入 -->
        <span @click="choose(4)">
          <i class="layui-icon layui-icon-fonts-code"></i>
        </span>
        <!-- hr -->
        <span @click="insertHr($event)">hr</span>
        <!-- 插入 -->
        <span @click="choose(5)">
          <i class="iconfont icon-yulan1"></i>
        </span>
      </div>
      <textarea name="content" class="layui-textarea fly-editor" v-model="content"  ref="textEdit"></textarea>
    </div>
  </div>
  <div ref="modal">
    <face :isShow="current === 0" @addEvent="addEvent" @closeEvent="closeModal()"></face>
    <ImgUpload :isShow="current === 1" @addEvent="addEvent" @closeEvent="closeModal()"></ImgUpload>
    <LinkAdd :isShow="current === 2"  @addEvent="addEvent"  @closeEvent="closeModal()"></LinkAdd>
    <Reference :isShow="current === 3"  @addEvent="addEvent" @closeEvent="closeModal()"></Reference>
    <InsertCode :isShow="current === 4" @addEvent="addEvent" @closeEvent="closeModal()" :width="codeWidth" :height="codeHeight"></InsertCode>
  </div>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import Face from './Face'
import ImgUpload from './ImgUpload'
import LinkAdd from './LinkAdd'
import Reference from './Reference'
import InsertCode from './InsertCode'

export default {
  name: 'Editor',
  data () {
  // 这里存放数据
    return {
      content: '',
      current: '',
      codeWidth: 400,
      codeHeight: 200
    }
  },
  components: {
    Face,
    ImgUpload,
    LinkAdd,
    Reference,
    InsertCode
  },
  methods: {
    addEvent (item) {
      console.log('item', item)
    },
    handleBodyClick (e) {
      e.stopPropagation()
      // 触发隐藏本组件的关闭事件,改变isShow
      // 判断是否点击到了非控制ICON以外 + 本组件的地方
      if (!(this.$refs.icons.contains(e.target) || this.$refs.modal.contains(e.target))) { // 判断点击了非自身模块
        this.closeModal()
      }
    },
    insertHr (e) {
      this.content += '[' + e.target.innerText + ']' + '\n'
    },
    choose (index) {
      if (index === this.current) {
        this.closeModal()
      } else {
        this.current = index
      }
    },
    closeModal () {
      this.current = ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click', this.handleBodyClick)
    })
    this.codeWidth = this.$refs.textEdit.offsetWidth
    this.codeHeight = this.$refs.textEdit.offsetHeight
    window.addEventListener('resize', () => {
      this.codeWidth = this.$refs.textEdit.offsetWidth
      this.codeHeight = this.$refs.textEdit.offsetHeight
    })
  },
  beforeDestroy () {
    document.querySelector('body').removeEventListener('click', this.handleBodyClick)
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
.edit-content {
  position: absolute;
  top: 45px;
  left: 0;
  z-index: 9;
}
</style>
