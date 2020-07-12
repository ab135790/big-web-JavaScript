<!--
 * @Author: your name
 * @Date: 2020-05-17 16:07:28
 * @LastEditTime: 2020-06-18 22:22:11
 * @LastEditors: Please set LastEditors
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
@import "assets/scss/common.scss";
@import "assets/css/layui-layer/layer.css";
// 公用样式
.svg {
  position: relative;
  top: -4px;
}
.gray {
  color: #999;
}
.orange {
  color: #ff5722;
}
.pull-right {
  float: right !important;
}
@for $i from 0 through 5 { // 基础玩法 through 也可以用 to
  .pd#{$i*10} {
    padding: $i * 10 + px;
  }
  .pr#{$i*10} {
    padding-right: $i * 10 + px;
  }
  .pl#{$i*10} {
    padding-left: $i * 10 + px;
  }
}

.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.d-flxe {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
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
</style>
