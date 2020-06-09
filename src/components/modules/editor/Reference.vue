<!--
 * @Author: your name
 * @Date: 2020-06-09 22:20:18
 * @LastEditTime: 2020-06-09 23:09:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\modules\editor\reference.vue
-->
<!--  -->
<template>
  <transition name="fade">
    <div class="layui-layer layui-layer-page layui-layer-prompt edit-content" v-show="isShow">
      <div class="layui-layer-title">请输入引用内容</div>
      <div class="layui-layer-content">
        <textarea cols="60" ref="content" placeholder="请输入内容" v-model="referenceContent" name="content" class="layui-textarea"></textarea>
      </div>
      <span class="layui-layer-setwin" @click="cancel()">
        <a href="javascript:void(0)" class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
      </span>
      <div class="layui-layer-btn">
        <button type="button" class="layui-btn layui-btn-normal" @click.prevent="submit()">确认</button>
        <button type="button" class="layui-btn layui-btn-primary" @click.prevent="cancel()">取消</button>
      </div>
    </div>
  </transition>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'reference',
  data () {
  // 这里存放数据
    return {
      referenceContent: ''
    }
  },
  props: ['isShow'],
  methods: {
    submit () {
      if (this.referenceContent === '') {
        this.$pop('shake', '请输入引用内容')
        this.$refs.content.focus()
        return
      }
      this.$emit('addEvent')
    },
    cancel () {
      this.referenceContent = ''
      this.$emit('closeEvent')
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类

</style>
