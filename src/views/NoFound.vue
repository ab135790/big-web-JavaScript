<!--
 * @Author: your name
 * @Date: 2020-05-31 02:28:32
 * @LastEditTime: 2020-05-31 02:34:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\views\NoFound.vue
-->
<!-- NoFound -->
<template>
  <div class='layui-container flex'>
    <!-- <img src="../assets/img/icon-404.png" width="100px" alt=""> -->
    <p class="pb20 pt10 flex_p">找不到页面了</p>
    <router-link class="layui-btn" to="/">回到首页</router-link>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  name: '404',
  data () {
  // 这里存放数据
    return {

    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.flex {
  width: 100%;
  min-height: 400px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  &_p {
    color: #666;
  }
}
</style>
