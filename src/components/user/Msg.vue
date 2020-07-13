<!--
 * @Author: your name
 * @Date: 2020-05-18 22:14:14
 * @LastEditTime: 2020-07-13 21:17:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\user\Center.vue
-->
<!--  -->
<template>
 <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user" id="LAY_msg" style="margin-top: 15px;">
      <button class="layui-btn layui-btn-danger" id="LAY_delallmsg" @click="clearAll()">清空全部消息</button>
      <div  id="LAY_minemsg" style="margin-top: 10px;">
        <!--<div class="fly-none">您暂时没有最新消息</div>-->
        <ul class="mine-msg" v-if="lists.length">
          <li v-for="(item, index) in lists" :key="'comments' + index">
            <blockquote class="layui-elem-quote">
              <router-link :to="{name: 'user', params: { uid: item.cuid._id }}"><cite>{{item.cuid.name}}</cite></router-link>回答了您的求解<router-link :to="{ name: 'detail', params: { tid: item.tid._id }}"><cite>{{item.title}}</cite></router-link>
            </blockquote>
            <div v-richtext="item.content"></div>
            <p><span>{{item.created | moment }}</span><a href="javascript:;" class="layui-btn layui-btn-small layui-btn-danger fly-delete" @click="clear(item)">删除</a></p>
          </li>
        </ul>
        <Pagination
          v-show="total > 1"
          :hasTotal="true"
          :hasSelect="true"
          :total="total"
          :current="page"
          @chageCurrent="handleChange"
          align="flex-start"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { mapState } from 'vuex'
import { getMsg, setMsg } from '@/api/user'
import Pagination from '@/components/modules/pagination/Index'
export default {
  name: 'user-msg',
  data () {
  // 这里存放数据
    return {
      lists: [],
      page: 0,
      limit: 10,
      total: 0,
      ws: {}
    }
  },
  components: {
    Pagination
  },
  computed: mapState({
    num: state => state.num.message ? state.num.message : 0
  }),
  mounted () {
    this.getMsgAll()
  },
  methods: {
    // 删除评论
    clear (item) {
      setMsg({ id: item._id }).then(res => {
        if (res.code === 200) {
          // 设置特定消息已读
          this.getMsgAll()
          this.$store.commit('setMessage', { message: this.num })
        }
      })
    },
    // 清空全部信息
    clearAll () {
      setMsg().then(res => {
        if (res.code === 200) {
          // 清空所有消息
          this.lists = []
          this.$store.commit('setMessage', { message: 0 })
          this.total = 0
        }
      })
    },
    getMsgAll () {
      getMsg({
        page: this.page,
        limit: this.limit
      }).then(res => {
        if (res.code === 200) {
          this.lists = res.data
          this.total = res.total
        }
      })
    },
    handleChange (val) {
      this.page = val
      this.getMsgAll()
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类

</style>
