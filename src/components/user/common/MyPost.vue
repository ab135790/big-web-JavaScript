<!--
 * @Author: your name
 * @Date: 2020-05-19 22:14:08
 * @LastEditTime: 2020-05-19 22:33:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\user\common\MyPost.vue
-->
<!--  -->
<template>
  <div class=''>
    <table class="layui-table" border="0">
      <thead>
        <tr class="text-center">
          <th>
            <div class="layui-table-cell pl0"><span>帖子标题</span></div>
          </th>
          <th>
            <div class="layui-table-cell"><span>状态</span></div>
          </th>
          <th>
            <div class="layui-table-cell"><span>结帖</span></div>
          </th>
          <th>
            <div class="layui-table-cell"><span>发表时间</span></div>
          </th>
          <th>
            <div class="layui-table-cell"><span>数据</span></div>
          </th>
          <th>
            <div class="layui-table-cell"><span>操作</span></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center">
          <td class="text-left">文章的测试标题123</td>
          <td>打开</td>
          <td>未结</td>
          <td>2019-01-01</td>
          <td>10阅/2答</td>
          <td>
            <div class="layui-btn layui-btn-xs">编辑</div>
            <div class="layui-btn layui-btn-xs layui-btn-danger">删除</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'myPost',
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
