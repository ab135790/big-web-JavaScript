<!--
 * @Author: your name
 * @Date: 2020-05-19 21:41:31
 * @LastEditTime: 2020-05-19 21:47:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\user\common\Myinfo.vue
-->
<!-- 修改信息 -->
<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
  <form method="post">
    <div class="layui-form-item">
      <label for="L_email" class="layui-form-label">邮箱</label>
      <div class="layui-input-inline">
        <input type="text" id="L_email" name="email" required lay-verify="email" autocomplete="off" value="" class="layui-input">
      </div>
      <div class="layui-form-mid layui-word-aux">如果您在邮箱已激活的情况下，变更了邮箱，需<a href="activate.html" style="font-size: 12px; color: #4f99cf;">重新验证邮箱</a>。</div>
    </div>
    <div class="layui-form-item">
      <label for="L_username" class="layui-form-label">昵称</label>
      <div class="layui-input-inline">
        <input type="text" id="L_username" name="username" required lay-verify="required" autocomplete="off" value="" class="layui-input">
      </div>
      <div class="layui-inline">
        <div class="layui-input-inline">
          <input type="radio" name="sex" value="0" checked title="男">
          <input type="radio" name="sex" value="1" title="女">
        </div>
      </div>
    </div>
    <div class="layui-form-item">
      <label for="L_city" class="layui-form-label">城市</label>
      <div class="layui-input-inline">
        <input type="text" id="L_city" name="city" autocomplete="off" value="" class="layui-input">
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label for="L_sign" class="layui-form-label">签名</label>
      <div class="layui-input-block">
        <textarea placeholder="随便写些什么刷下存在感" id="L_sign"  name="sign" autocomplete="off" class="layui-textarea" style="height: 80px;"></textarea>
      </div>
    </div>
    <div class="layui-form-item">
      <button class="layui-btn" key="set-mine">确认修改</button>
    </div>
  </form>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'myinfo',
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
