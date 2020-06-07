<!--
 * @Author: your name
 * @Date: 2020-05-17 16:07:29
 * @LastEditTime: 2020-06-07 17:33:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\contents\Top.vue
-->
<template>
  <div class="fly-panel" v-show="lists.length">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a href="#signin" class="layui-hide-sm layui-show-xs-block fly-right" id="LAY_goSignin" style="color: #FF5722;">去签到</a>
    </div>
    <ListItem :lists="lists" :isShow="false"/>
  </div>
</template>

<script>
import { mixin } from '@/mixin/_mixin'
import ListItem from './ListItem'
export default {
  mixins: [mixin],
  name: 'top',
  data () {
    return {
      lists: [],
      isTop: 1,
      limit: 4
    }
  },
  mounted () {
    this._getList()
  },
  components: {
    ListItem
  }
}
</script>

<style lang="scss" scoped>

</style>
