<!--
 * @Author: your name
 * @Date: 2020-06-07 14:41:50
 * @LastEditTime: 2020-07-03 22:17:46
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
        <span @click="addHr($event)">hr</span>
        <!-- 插入 -->
        <span @click="choose(5)">
          <i class="iconfont icon-yulan1"></i>
        </span>
      </div>
      <textarea name="content" id="edit" class="layui-textarea fly-editor" @focus="focusEvent()" @blur="blurEvent()" v-model="content"  ref="textEdit"></textarea>
    </div>
  </div>
  <div ref="modal">
    <face :isShow="current === 0" @addEvent="addFace" @closeEvent="closeModal()"></face>
    <ImgUpload :isShow="current === 1" @addEvent="addPic" @closeEvent="closeModal()"></ImgUpload>
    <LinkAdd :isShow="current === 2"  @addEvent="addLink"  @closeEvent="closeModal()"></LinkAdd>
    <Reference :isShow="current === 3"  @addEvent="addCode" @closeEvent="closeModal()"></Reference>
    <InsertCode :isShow="current === 4" @addEvent="addQuote" @closeEvent="closeModal()" :width="codeWidth" :height="codeHeight"></InsertCode>
    <Preview :isShow="current === 5" :content="content"></Preview>
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
import Preview from './Preview'

export default {
  name: 'Editor',
  data () {
  // 这里存放数据
    return {
      content: '',
      current: '',
      codeWidth: 400,
      codeHeight: 200,
      pos: ''
    }
  },
  props: ['initContent'],
  components: {
    Face,
    ImgUpload,
    LinkAdd,
    Reference,
    InsertCode,
    Preview
  },
  watch: {
    initContent (newval, oldval) {
      this.content = newval
    }
  },
  updated () {
    this.$emit('changeContent', this.content)
    // console.log('content', this.content)
  },
  methods: {
    // 添加表情
    addFace (item) {
      const insertContent = ` face${item}`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加图片链接
    addPic (item) {
      const insertContent = ` img[${item}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    addEvent (item) {
      console.log('item', item)
    },
    // 添加链接
    addLink (item) {
      const insertContent = ` a(${item})[${item}]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加代码
    addCode (item) {
      const insertContent = ` \n[pre]\n${item}[/pre]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加引用
    addQuote (item) {
      const insertContent = ` \n[quote]\n${item}[/quote]`
      this.insert(insertContent)
      this.pos += insertContent.length
    },
    // 添加hr
    addHr (e) {
      this.insert(`\n[hr]`)
      this.pos += 5
    },
    handleBodyClick (e) {
      e.stopPropagation()
      // 触发隐藏本组件的关闭事件,改变isShow
      // 判断是否点击到了非控制ICON以外 + 本组件的地方
      if (!(this.$refs.icons.contains(e.target) || this.$refs.modal.contains(e.target))) { // 判断点击了非自身模块
        this.closeModal()
      }
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
    },
    insert (val) {
      if (typeof this.content === 'undefined') {
        return
      }
      let tmp = this.content.split('')
      tmp.splice(this.pos, 0, val)
      this.content = tmp.join('')
    },
    blurEvent () {
      this.getPos()
    },
    focusEvent () {
      this.getPos()
    },
    // 计算当前的光标位置
    getPos () {
      let cursorPos = 0
      let elem = document.getElementById('edit')
      if (document.selection) {
        // ie
        let selectRange = document.selection.createRange()
        selectRange.moveStart('character', elem.value.length)
        cursorPos = selectRange.text.length
      } else if (elem.selectionStart || elem.selectionStart === '0') {
        cursorPos = elem.selectionStart
      }
      this.pos = cursorPos
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
  background: #fff;
}
.layui-layer-prompt {
  box-shadow: 0 0 20px rgba(0, 0, 0, .2);
}
</style>
