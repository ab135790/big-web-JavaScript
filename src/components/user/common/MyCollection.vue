<!--
 * @Author: your name
 * @Date: 2020-05-19 22:14:30
 * @LastEditTime: 2020-07-01 21:56:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\user\common\MyCollection.vue
-->
<!--  -->
<template>
  <div>
    <div class='overflow'>
      <table class="layui-table">
        <thead>
          <tr>
            <th class="title">
              <div class="layui-table-cell pl0"><span>帖子标题</span></div>
            </th>
            <th>
              <div class="layui-table-cell text-right pr0"><span>收藏时间</span></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="list.length">
            <tr v-for="(item, index) of list" :key="'item' + index">
              <td class="text-left">
                <router-link class="link" :to="{ name: 'detail', params: { tid: item.tid }}">
                  {{item.title}}
                </router-link>
              </td>
              <td class="text-right">{{item.created | moment}}</td>
            </tr>
          </template>
          <template v-else>
            <tr class="text-center">
              <td colspan="6">没有相关贴子</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <Pagination
      v-show="total > 1"
      :hasTotal="true"
      :hasSelect="true"
      :total="total"
      :current="current"
      @chageCurrent="handleChange"
      align="flex-start"></Pagination>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getCollectListByUid } from '@/api/user'
import Pagination from '@/components/modules/pagination/Index'
export default {
  name: 'myCollection',
  data () {
  // 这里存放数据
    return {
      list: [],
      page: 0,
      limit: 10,
      total: 0,
      current: 0
    }
  },
  components: {
    Pagination
  },
  mounted () {
    this.getCollectList()
  },
  methods: {
    getCollectList () {
      getCollectListByUid({
        page: this.current,
        limit: this.limit
      }).then(res => {
        if (res.code === 200) {
          this.list = res.data
          this.total = res.total
        }
      })
    },
    handleChange (val) {
      this.current = val
      this.getCollectList()
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.title {
  width: 70%;
}
.overflow {
  overflow-y: auto;
}
.min-cell {
  min-width: 80px;
}
.link {
  color: #01aaed;
}
</style>
