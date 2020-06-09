<!--
 * @Author: your name
 * @Date: 2020-06-09 22:52:49
 * @LastEditTime: 2020-06-09 23:36:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\modules\editor\InsertCode.vue
-->
<!--  -->
<template>
  <transition name="fade">
    <div class="layui-layer layui-layer-page layui-layer-prompt edit-content" v-show="isShow" :style="{'width': width + 'px', 'height': height + 'px' }">
      <div class="layui-layer-title">请插入代码或内容</div>
      <div class="layui-layer-content">
        <textarea  ref="content" placeholder="请输入内容" v-model="insertCode" name="content" class="layui-textarea"></textarea>
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
  name: 'insertCode',
  data () {
  // 这里存放数据
    return {
      insertCode: ''
    }
  },
  props: ['isShow', 'width', 'height'],
  methods: {
    submit () {
      if (this.insertCode === '') {
        this.$pop('shake', '请输入引用内容')
        this.$refs.content.focus()
        return
      }
      this.$emit('addEvent')
    },
    cancel () {
      this.insertCode = ''
      this.$emit('closeEvent')
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类

</style>
