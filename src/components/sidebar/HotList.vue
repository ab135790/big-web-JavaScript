<!--
 * @Author: your name
 * @Date: 2020-05-17 16:07:29
 * @LastEditTime: 2020-05-17 19:42:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\sidebar\HotList.vue
-->
<template>
  <div>
    <dl class="fly-panel fly-list-one">
      <dt class="fly-panel-title">本周热议</dt>
      <dd v-for="(item, index) of lists" :key="'topWeek' + index">
        <a href="">{{item.content}}</a>
        <!-- <a href="">{{item.title}}</a> -->
        <span><i class="iconfont icon-pinglun1"></i> {{item.isRead}}</span>
        <!-- <span><i class="iconfont icon-pinglun1"></i> {{item.answer}}</span> -->
      </dd>

      <!-- 无数据时 -->
      <div class="fly-none" v-if="!lists.length">没有相关数据</div>
    </dl>
  </div>
</template>

<script>
import { getTop } from '@/api/content'
export default {
  name: 'hotList',
  data () {
    return {
      lists: []
    }
  },
  mounted () {
    getTop().then(res => {
      if (res.code === 200) {
        this.lists = res.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
