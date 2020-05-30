<!--
 * @Author: your name
 * @Date: 2020-05-18 22:14:14
 * @LastEditTime: 2020-05-19 22:39:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\user\Center.vue
-->
<!--  -->
<template>
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief">
      <ul class="layui-tab-title">
        <li>
          <router-link :to="{name: 'myPost'}">我的发帖</router-link>
        </li>
        <li>
          <router-link :to="{name: 'myCollection'}">我收藏的帖</router-link>
        </li>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'user-posts',
  data () {
  // 这里存放数据
    return {

    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类

</style>
