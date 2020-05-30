<!--
 * @Author: your name
 * @Date: 2020-05-19 22:14:30
 * @LastEditTime: 2020-05-19 22:38:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\user\common\MyCollection.vue
-->
<!--  -->
<template>
  <div class=''>
    <table class="layui-table">
      <thead>
        <tr>
          <th class="title">
            <div class="layui-table-cell pl0"><span>帖子标题</span></div>
          </th>
          <th>
            <div class="layui-table-cell text-right pr0"><span>收藏时间</span></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left">收藏的帖子标题</td>
          <td class="text-right">2019-01-01 00:00:00</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'myCollection',
  data () {
  // 这里存放数据
    return {

    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.title {
  width: 70%;
}
</style>
