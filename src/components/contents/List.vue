<template>
  <div class="fly-panel" style="margin-bottom: 0;">

    <div class="fly-panel-title fly-filter">
      <a @click.prevent="search()" :class="{'layui-this': status === '' && tag === ''}">综合</a>
      <span class="fly-mid"></span>
      <a @click.prevent="search(0)" :class="{'layui-this': status === '0'}">未结</a>
      <span class="fly-mid"></span>
      <a @click.prevent="search(1)" :class="{'layui-this': status === '1'}">已结</a>
      <span class="fly-mid"></span>
      <a @click.prevent="search(2)" :class="{'layui-this': status === '' && tag === '精华'}">精华</a>
      <span class="fly-filter-right layui-hide-xs">
            <a @click.prevent="search(3)" :class="{'layui-this': sort === 'created'}">按最新</a>
            <span class="fly-mid"></span>
            <a @click.prevent="search(4)" :class="{'layui-this': sort === 'answer'}">按热议</a>
          </span>
    </div>
    <ListItem :lists="lists" @nextPage="nextPage" :isEnd="isEnd"/>
  </div>
</template>

<script>
import { mixin } from '@/mixin/_mixin'
import ListItem from './ListItem'
export default {
  mixins: [mixin],
  name: 'list',
  components: {
    ListItem
  },
  data () {
    return {
      isEnd: false,
      isRepeat: false,
      isTop: 0
    }
  },
  watch: {
    // 去监听current标签是否有变化，如果有变化就进行初始化数据
    current (newVal, oldVal) {
      console.log('oldVal', oldVal, 'newVal', newVal)
      this.init()
    },
    '$route' (newVal, oldVal) {
      let catalog = newVal.params['catalog']
      if (typeof catalog !== 'undefined' && catalog !== '') {
        this.catalog = catalog
      }
      this.init()
    }
  },
  mounted () {
    this._getList()
  },
  methods: {
    init () {
      this.page = 0
      this.isEnd = false
      this.lists = []
      this._getList()
    },
    search (val) {
      if (typeof val === 'undefined' && this.current === '') return
      console.log(typeof val)
      this.current = val
      switch (val) {
        // 未结贴
        case 0:
          this.status = '0'
          this.tag = ''
          break
        // 已结贴
        case 1:
          this.status = '1'
          this.tag = ''
          break
        // 精华内容
        case 2:
          this.status = ''
          this.tag = '精华'
          break
        // 已结贴
        case 3:
          this.sort = 'created'
          break
        // 精华内容
        case 4:
          this.sort = 'answer'
          break
        // 综合查询
        default:
          this.status = ''
          this.tag = ''
          this.current = ''
      }
    },
    /** 2020-2-26 0026
     *作者:青型科技
     *功能: 获取下一页数据
     *参数:
     */
    nextPage () {
      this.page++
      this._getList()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
