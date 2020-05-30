<!--
 * @Author: your name
 * @Date: 2020-05-26 23:43:27
 * @LastEditTime: 2020-05-26 23:47:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\sidebar\SignInfo.vue
-->
<!--  -->
<template>
    <div class="modal" v-show="isShow">
      <div class="mask" @click="close()"></div>
      <div class="layui-layer layui-layer-page" :class="{'active': isShow}">
        <div class="layui-layer-title plr20 ptb0">
          签到说明
          <i class="layui-icon layui-icon-close pull-right" @click="close()"></i>
        </div>
        <div class="layui-layer-content plr20 ptb20">
          <div class="layui-text">
            <blockquote class="layui-elem-quote">“签到”可获得的社区积分，规则如下</blockquote>
            <table class="layui-table">
              <thead>
                <tr>
                  <th>连续签到天数</th>
                  <th>每天可获积分</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>&lt;5</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>&ge;5</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>&ge;15</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>&ge;30</td>
                  <td>15</td>
                </tr>
                <tr>
                  <td>&ge;100</td>
                  <td>30</td>
                </tr>
                <tr>
                  <td>&ge;365</td>
                  <td>50</td>
                </tr>
              </tbody>
            </table>
            <div>
              <p>中间若有间隔，则连续天数重新计算</p>
              <p class="orange">不可复用程序自动签到，否则积分清零呢</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'sign-info',
  data () {
  // 这里存放数据
    return {

    }
  },
  props: {
    isShow: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    choose (val) {
      this.current = val
    },
    close () {
      this.$emit('closeModal')
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类

</style>
