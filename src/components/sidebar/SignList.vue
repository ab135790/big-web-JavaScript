<!--
 * @Author: your name
 * @Date: 2020-05-26 23:43:27
 * @LastEditTime: 2020-05-26 23:52:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\sidebar\SignInfo.vue
-->
<!--  -->
<template>
    <div class="modal" v-show="showList">
      <div class="mask" @click="close()"></div>
      <div class="layui-layer layui-layer-page" :class="{'active': showList}">
        <div class="layui-layer-title plr20 ptb0">
          签到活跃榜 - TOP
          <i class="layui-icon layui-icon-close pull-right" @click="close()"></i>
        </div>
        <div class="layui-layer-content">
          <div class="layui-tab layui-tab-brief">
            <ul class="layui-tab-title">
              <li :class="{'layui-this': current === 0}" @click="choose(0)">最新签到</li>
              <li :class="{'layui-this': current === 1}" @click="choose(1)">今日最快</li>
              <li :class="{'layui-this': current === 2}" @click="choose(2)">总签到榜</li>
            </ul>
            <div class="layui-tab-content ptb0 plr10">
              <ul class="layui-tab-item layui-show">
                <li v-for="(item, index) in lists" :key="'sign' + index">
                  <img :src="require('@/assets/logo-1.png')" alt="" class="mr1">
                  <cite class="fly-link mlr10">{{item.name}}</cite>
                  <span class="fly-grey" v-if="current !== 2">签到于{{item.created}}</span>
                  <span class="fly-grey" v-else>已经连续签到
                    <i class="orange">{{item.count}}</i>天
                  </span>
                </li>
              </ul>
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
  name: 'sign-list',
  data () {
  // 这里存放数据
    return {
      current: 0,
      lists: [
        {
          name: 'test',
          count: 4,
          created: '2020-5-26'
        },
        {
          name: 'test1',
          count: 4,
          created: '2020-5-26'
        },
        {
          name: 'test2',
          count: 4,
          created: '2020-5-26'
        },
        {
          name: 'test3',
          count: 4,
          created: '2020-5-26'
        }
      ]
    }
  },
  props: {
    showList: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    choose (val) {
      this.current = val
      // 请求后台拉取数据
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
