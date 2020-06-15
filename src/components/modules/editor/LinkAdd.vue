<!--
 * @Author: your name
 * @Date: 2020-06-09 21:47:49
 * @LastEditTime: 2020-06-14 22:30:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\modules\editor\LinkAdd.vue
-->
<!--  -->
<template>
  <transition name="fade">
    <div class="layui-layer-page layui-layer-prompt edit-content" v-show="isShow">
      <div class="layui-layer-title">请输入合法链接</div>
      <div class="layui-layer-content">
        <input type="text" class="layui-layer-input" ref="inputItem" v-model="link">
      </div>
      <span class="layui-layer-setwin" @click="cancel()">
        <a href="javascript:void(0)" class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
      </span>
      <div class="layui-layer-btn">
        <a href="javascript:void(0)" class="layui-layer-btn" @click.prevent="submit()">确定</a>
        <a href="javascript:void(0)" class="layui-layer-btn" @click.prevent="cancel()">取消</a>
      </div>
    </div>
  </transition>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'LinkAdd',
  data () {
  // 这里存放数据
    return {
      link: ''
    }
  },
  props: ['isShow'],
  methods: {
    submit () {
      if (this.link === '') {
        this.$refs.inputItem.focus()
        this.$pop('shake', '请输入合法链接')
        return
      }
      this.$emit('addEvent', this.link)
      this.$emit('closeEvent')
    },
    cancel () {
      this.link = ''
      this.$emit('closeEvent')
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类

</style>
