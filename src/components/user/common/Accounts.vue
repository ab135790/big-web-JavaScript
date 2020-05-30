<!--
 * @Author: your name
 * @Date: 2020-05-19 21:44:34
 * @LastEditTime: 2020-05-19 22:04:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\user\common\Accounts.vue
-->
<!-- 账号绑定 -->
<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <ul class="app-bind">
      <li class="fly-msg app-havebind">
        <i class="iconfont icon-qq"></i>
        <span>已成功绑定，您可以使用QQ帐号直接登录Imooc社区，当然，您也可以</span>
        <a href="javascript:;" class="acc-unbind" type="qq_id">解除绑定</a>

        <!-- <a href="" onclick="layer.msg('正在绑定微博QQ', {icon:16, shade: 0.1, time:0})" class="acc-bind" type="qq_id">立即绑定</a>
        <span>，即可使用QQ帐号登录Imooc社区</span> -->
      </li>
      <li class="fly-msg">
        <i class="iconfont icon-weibo"></i>
        <!-- <span>已成功绑定，您可以使用微博直接登录Imooc社区，当然，您也可以</span>
        <a href="javascript:;" class="acc-unbind" type="weibo_id">解除绑定</a> -->

        <a href="" class="acc-weibo" type="weibo_id" >立即绑定</a>
        <span>，即可使用微博帐号登录Imooc社区</span>
      </li>
    </ul>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'accounts',
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
