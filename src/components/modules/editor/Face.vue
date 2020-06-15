<!--
 * @Author: your name
 * @Date: 2020-06-07 19:51:08
 * @LastEditTime: 2020-06-14 22:30:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\modules\editor\Face.vue
-->
<!--  -->
<template>
  <transition name="fade">
      <div class="layui-layer-tips layui-edit-face edit-content">
      <div class="layui-layer-content" v-show="isShow">
        <ul class="layui-clear">
          <li v-for="(value, key) in lists" :key="key" @click="handleFaceClick(key)">
            <!-- value: {{value}} - key: {{key}} -->
            <img :src="value" :alt="key">
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import faces from '@/assets/js/face'
export default {
  name: 'face',
  props: ['isShow'],
  data () {
  // 这里存放数据
    return {
      lists: faces
    }
  },
  methods: {
    handleFaceClick (item) {
      this.$emit('addEvent', item)
      this.$emit('closeEvent')
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
</style>
