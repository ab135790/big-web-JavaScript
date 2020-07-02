<!--
 * @Author: your name
 * @Date: 2020-05-19 22:14:08
 * @LastEditTime: 2020-07-01 21:55:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\user\common\MyPost.vue
-->
<!--  -->
<template>
  <div>
    <div class='overflow'>
      <table class="layui-table" border="0">
        <thead>
          <tr class="layui-table-header">
            <th>
              <div class="layui-table-cell pl0"><span>帖子标题</span></div>
            </th>
            <th>
              <div class="layui-table-cell"><span>状态</span></div>
            </th>
            <th>
              <div class="layui-table-cell"><span>结帖</span></div>
            </th>
            <th>
              <div class="layui-table-cell"><span>发表时间</span></div>
            </th>
            <th>
              <div class="layui-table-cell"><span>数据</span></div>
            </th>
            <th class="min-cell">
              <div class="layui-table-cell"><span>操作</span></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="list.length">
            <tr class="text-center" v-for="(item, index) of list" :key="'item' + index">
              <td class="text-left">
                <router-link class="link" :to="{ name: 'detail', params: { tid: item._id }}">
                  {{item.title}}
                </router-link>
              </td>
              <td>{{item.status === '0' ? '打开' : '关闭'}}</td>
              <td :class="{'success': item.isEnd !== '0'}">{{item.isEnd === '0' ? '未结' : '已结贴'}}</td>
              <td>{{item.created | moment}}</td>
              <td>{{item.reads}}阅/{{item.answer}}答</td>
              <td>
                <div @click="EditPost(item)" :class="{'layui-btn-disabled': item.isEnd === '1'}" class="layui-btn layui-btn-xs">编辑</div>
                <div class="layui-btn layui-btn-xs layui-btn-danger" @click="deletePost(item)">删除</div>
              </td>
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
import { getPostListByUid, deletePostByUid } from '@/api/user'
import Pagination from '@/components/modules/pagination/Index'
export default {
  name: 'myPost',
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
    this.getPostList()
  },
  methods: {
    getPostList () {
      console.log('current', this.current)
      getPostListByUid({
        page: this.current,
        limit: this.limit
      }).then(res => {
        if (res.code === 200) {
          this.list = res.data
          this.total = res.total
        }
      })
    },
    deletePost (item) {
      this.$confirm('确定删除嘛？', () => {
        if (item.isEnd !== '0') {
          this.$pop('shake', '帖子已结帖，无法删除')
          return
        }
        deletePostByUid({
          tid: item._id
        }).then(res => {
          if (res.code === 200) {
            this.list.splice(this.list.indexOf(item), 1)
          }
          this.$pop('', res.msg)
        })
      }, () => {

      })
    },
    handleChange (val) {
      this.current = val
      this.getPostList()
    },
    EditPost (item) {
      if (item.isEnd === '1') {
        this.$pop('shake', '帖子已经结帖，无法编辑')
      } else {
        this.$router.push({
          name: 'edit',
          params: { tid: item._id, page: item }
        })
      }
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.overflow {
  overflow-y: auto;
}
.min-cell {
  min-width: 80px;
}
.link {
  color: #01aaed;
}
.success {
  color: #5fb85f;
}
.layui-table-header {
  th {
    text-align: center;
    &:first-child {
      text-align: left;
    }
  }
}
</style>
