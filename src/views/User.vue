<!--
 * @Author: your name
 * @Date: 2020-05-18 22:31:04
 * @LastEditTime: 2020-07-02 23:44:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\user\User.vue
-->
<!--  -->
<template>
  <div class=''>
    <div class="fly-home fly-panel" style="background-image: url();">
      <img :src="userInfo.pic ? userInfo.pic : require('@/assets/img/default.png')" alt="用户头像">
      <i class="iconfont icon-renzheng" title="Imooc社区认证"></i>
      <h1>
        {{userInfo.name}}
        <i class="iconfont icon-nan"></i>
        <!-- <i class="iconfont icon-nv"></i>  -->
        <i class="layui-badge fly-badge-vip">{{userInfo.isVip === '0' ? '非VIP' : 'VIP' + userInfo.isVip}}</i>
        <!--
        <span style="color:#c00;">（管理员）</span>
        <span style="color:#5FB878;">（社区之光）</span>
        <span>（该号已被封）</span>
        -->
      </h1>

      <!-- <p style="padding: 10px 0; color: #5FB878;">认证信息：layui 作者</p> -->

      <p class="fly-home-info">
        <i class="iconfont icon-kiss" title="飞吻"></i><span style="color: #FF7200;">{{userInfo.favs}} 积分</span>
        <i class="iconfont icon-shijian"></i><span>{{userInfo.created | moment}} 加入</span>
        <i class="iconfont icon-chengshi"></i><span>来自{{userInfo.location}}</span>
      </p>

      <p class="fly-home-sign">（{{userInfo.regmark}}）</p>

      <div class="fly-sns" data-user="">
        <a href="javascript:;" class="layui-btn layui-btn-primary fly-imActive" data-type="addFriend">加为好友</a>
        <a href="javascript:;" class="layui-btn layui-btn-normal fly-imActive" data-type="chat">发起会话</a>
      </div>

    </div>

    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md6 fly-home-jie">
          <div class="fly-panel">
            <h3 class="fly-panel-title">{{userInfo.name}} 最近的提问</h3>
            <ul class="jie-row">
              <li v-for="(item, index) of postList" :key="'postList' + index">
                <div class="fly-list-badge" v-show="item.tags.length > 0 && item.tags[0].name !== ''">
                  <span class="layui-badge" v-for="(tag, index) in item.tags" :key="'tag' + index" :class="tag.class">{{tag.name}}</span>
                </div>
                <router-link :to="{name: 'detail', params: { tid: item._id }}" href="" class="jie-title">{{item.title}}</router-link>
                <i>{{item.created | moment}}</i>
                <em class="layui-hide-xs">{{item.reads}}阅/{{item.answer}}答</em>
              </li>
              <div v-show="postList.length === 0" class="fly-none" style="min-height: 50px; padding:30px 0; height:auto;"><i style="font-size:14px;">没有发表任何求解</i></div>
            </ul>
          </div>
        </div>

        <div class="layui-col-md6 fly-home-da">
          <div class="fly-panel">
            <h3 class="fly-panel-title">{{userInfo.name}} 最近的回答</h3>
            <ul class="home-jieda">
              <li v-for="(item, index) of commentList" :key="'commentList' + index">
              <p>
                <span>{{item.created | moment}}</span>
                在<router-link
                :to="item.tid? {name: 'detail', params: {tid: item.tid ? item.tid._id : ''}} : {name: '404'}">{{item.tid ? item.tid.title: '用户已经删除该帖'}}</router-link>中回答：
              </p>
              <div class="home-dacontent" v-richtext="item.content"></div>
            </li>
              <div v-show="commentList.length === 0" class="fly-none" style="min-height: 50px; padding:30px 0; height:auto;"><span>没有回答任何问题</span></div>
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
import { getCommentList, getInfo, getPostPublic } from '@/api/user'
export default {
  name: 'user',
  props: ['uid'],
  data () {
  // 这里存放数据
    return {
      postList: [],
      commentList: [],
      userInfo: {}
    }
  },
  mounted () {
    this.getUserInfo()
    this.getPostList()
    this.getCommentList()
  },
  methods: {
    getUserInfo () {
      // 获取用户的基本信息
      getInfo({ uid: this.uid ? this.uid : this.$store.state.userInfo._id }).then(res => {
        if (res.code === 200) {
          this.userInfo = res.data
        }
      })
    },
    getPostList () {
      // 获取最近的发贴列表
      getPostPublic({
        uid: this.uid ? this.uid : this.$store.state.userInfo._id,
        page: 0,
        limit: 20
      }).then(res => {
        if (res.code === 200) {
          this.postList = res.data
        }
      })
    },
    getCommentList () {
      // 获取最近的评论信息
      getCommentList({
        uid: this.uid ? this.uid : this.$store.state.userInfo._id,
        page: 0,
        limit: 20
      }).then(res => {
        if (res.code === 200) {
          this.commentList = res.data
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类

</style>
