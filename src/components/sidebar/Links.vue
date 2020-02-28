<template>
  <div class="fly-panel fly-link">
    <h3 class="fly-panel-title">友情链接</h3>
    <dl class="fly-panel-main" v-if="lists.length">
      <dd v-for="(item, index) of lists" :key="'links' + index">
        <a :href="item.link" target="_blank">{{item.title}}</a>
      </dd>
      <dd><a href="" class="fly-link">申请友链</a></dd>
    </dl>
  </div>
</template>

<script>
// mailto:xianxin@layui-inc.com?subject=%E7%94%B3%E8%AF%B7Fly%E7%A4%BE%E5%8C%BA%E5%8F%8B%E9%93%BE
import { getLinks } from '@/api/content'
export default {
  name: 'links',
  data () {
    return {
      lists: []
    }
  },
  mounted () {
    getLinks().then(res => {
      if (res.code === 200) {
        this.lists = res.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
