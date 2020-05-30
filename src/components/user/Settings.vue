<!--
 * @Author: your name
 * @Date: 2020-05-18 22:14:14
 * @LastEditTime: 2020-05-19 22:03:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\user\Center.vue
-->
<!--  -->
<template>
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title" id="LAY_mine">
          <li><router-link :to="{name: 'myinfo'}">我的资料</router-link></li>
          <li><router-link :to="{name: 'picUpload'}">头像</router-link></li>
          <li><router-link :to="{name: 'password'}">密码</router-link></li>
          <li><router-link :to="{name: 'accounts'}">帐号绑定</router-link></li>
        </ul>
        <div class="layui-tab-content" style="padding: 20px 0;">
            <router-view></router-view>
        </div>
      </div>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'user-setting',
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
