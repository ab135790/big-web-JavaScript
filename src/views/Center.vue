<!--
 * @Author: your name
 * @Date: 2020-05-18 21:38:16
 * @LastEditTime: 2020-05-18 22:38:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\views\Center.vue
-->
<template>
  <div class='layui-container fly-marginTop fly-user-main'>
    <ul class="layui-nav layui-nav-tree" lay-filter="test">
    <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
      <li
      class="layui-nav-item"
      v-for="(menu, index) of lists"
      :key="'menu' + index"
      >
      <router-link :to="{name: menu.link}">
        <i class="layui-icon" :class="menu.icon"></i> {{menu.name}}
      </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'center',
  data () {
  // 这里存放数据
    return {
      lists: [
        {
          name: '我的主页',
          icon: 'layui-icon-home',
          link: 'user'
        },
        {
          name: '用户中心',
          icon: 'layui-icon-friends',
          link: 'user-center'
        },
        {
          name: '基本设置',
          icon: 'layui-icon-set',
          link: 'user-settings'
        },
        {
          name: '我的帖子',
          icon: 'layui-icon-form',
          link: 'user-posts'
        },
        {
          name: '我的消息',
          icon: 'layui-icon-reply-fill',
          link: 'user-msg'
        },
        {
          name: '其他设置',
          icon: 'layui-icon-component',
          link: 'user-others'
        }
      ]
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
  .iconwang {
    margin-right: 10px;
  }
</style>
