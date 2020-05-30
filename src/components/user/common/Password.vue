<!--
 * @Author: your name
 * @Date: 2020-05-19 21:43:37
 * @LastEditTime: 2020-05-19 21:47:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\user\common\Password.vue
-->
<!-- 修改密码 -->
<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <form action="/user/repass" method="post">
      <div class="layui-form-item">
        <label for="L_nowpass" class="layui-form-label">当前密码</label>
        <div class="layui-input-inline">
          <input type="password" id="L_nowpass" name="nowpass" required lay-verify="required" autocomplete="off" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <label for="L_pass" class="layui-form-label">新密码</label>
        <div class="layui-input-inline">
          <input type="password" id="L_pass" name="pass" required lay-verify="required" autocomplete="off" class="layui-input">
        </div>
        <div class="layui-form-mid layui-word-aux">6到16个字符</div>
      </div>
      <div class="layui-form-item">
        <label for="L_repass" class="layui-form-label">确认密码</label>
        <div class="layui-input-inline">
          <input type="password" id="L_repass" name="repass" required lay-verify="required" autocomplete="off" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <button class="layui-btn" key="set-mine" lay-filter="*" lay-submit>确认修改</button>
      </div>
    </form>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'password',
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
