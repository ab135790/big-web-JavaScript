<!--
 * @Author: your name
 * @Date: 2020-06-09 22:20:18
 * @LastEditTime: 2020-06-10 22:11:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\modules\editor\reference.vue
-->
<!--  -->
<template>
  <transition name="fade">
    <div id="preview" class="layui-layer-page layui-layer-prompt edit-content" v-show="isShow">
      <div class="layui-layer-title">预览</div>
      <div class="layui-layer-content">
        <div class="detail-body" v-html="replaceContent"></div>
      </div>
      <span class="layui-layer-setwin" @click="cancel()">
        <a href="javascript:void(0)" class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
      </span>
    </div>
  </transition>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { escapeHtml } from '@/utils/escapeHtml.js'
export default {
  name: 'preview',
  data () {
  // 这里存放数据
    return {
    }
  },
  computed: {
    replaceContent () {
      // 根据content的内容,转义成为html代码
      if (typeof this.content === 'undefined' || this.content.trim() === '') {
        return
      }
      return escapeHtml(this.content)
    }
  },
  props: ['isShow', 'content'],
  methods: {
    cancel () {
      this.$emit('closeEvent')
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
#preview {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fff;
  top: 0;
  left: 0;
  z-index: 9;
}
</style>
