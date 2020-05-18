<!--
 * @Author: your name
 * @Date: 2020-05-17 16:07:28
 * @LastEditTime: 2020-05-18 22:06:17
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\App.vue
-->
<template>
  <div id="app">
    <imooc-header></imooc-header>
    <router-view></router-view>
    <imooc-footer></imooc-footer>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'app',
  components: {
    'imooc-header': Header,
    'imooc-footer': Footer
  }
}
</script>

<style lang="scss">
@import "assets/css/global.css";

// 公用样式
.svg {
  position: relative;
  top: -4px;
}
.gray {
  color: #999;
}
</style>
