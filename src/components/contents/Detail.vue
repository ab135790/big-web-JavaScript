<!--
 * @Author: your name
 * @Date: 2020-06-16 22:03:57
 * @LastEditTime: 2020-06-23 23:47:11
 * @LastEditors: Please set LastEditors
 * @Description: In uid Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\contents\Detail.vue
-->
<!--  -->
<template>
<div class="layui-container">
  <Panel></Panel>
  <div class="layui-row layui-col-space15">
    <div class="layui-col-md8 content detail">
      <div class="fly-panel detail-box">
        <h1>{{page.title}}</h1>
        <div class="fly-detail-info">
          <!-- <span class="layui-badge">审核中</span> -->
          <span class="layui-badge layui-bg-green fly-detail-column" v-if="page.catalog === 'logs'">动态</span>
          <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog === 'share'">分享</span>
          <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog === 'ask'">提问</span>
          <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog === 'advise'">建议</span>
          <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog === 'discuss'">交流</span>
          <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog === 'notice'">公告</span>

          <span class="layui-badge" style="background-color: #999;" v-if="parseInt(page.isEnd) === '0'">未结</span>
          <span class="layui-badge" style="background-color: #5FB878;" v-else>已结</span>

          <span class="layui-badge layui-bg-black" v-show="page.isTop === '1'">置顶</span>
          <span class="layui-badge" :class="tag.class" v-for="(tag, index) in page.tags" :key="'tag' + index">{{tag.name}}</span>

          <!-- <div class="fly-admin-box" data-id="123">
            <span class="layui-btn layui-btn-xs jie-admin" type="del">删除</span>

            <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="1" v-show="page.isTop === '1'">置顶</span>
            <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="0" style="background-color:#ccc;">取消置顶</span>

            <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="1">加精</span>
            <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="0" style="background-color:#ccc;">取消加精</span>
          </div> -->
          <span class="fly-list-nums">
            <a href="#comment"><i class="iconfont" title="回答">&#xe60c;</i> {{page.answer}}</a>
            <i class="iconfont" title="人气">&#xe60b;</i> {{page.reads}}
          </span>
        </div>
        <!-- 收藏、作者信息 -->
        <div class="detail-about">
          <a class="fly-avatar" href="../uid/home.html">
            <img :src="page.uid ? page.uid.pic : require('@/assets/img/default.png')">
          </a>
          <div class="fly-detail-uid">
            <a href="../uid/home.html" class="fly-link">
              <cite>{{page.uid ? page.uid.name : 'testName'}}</cite>
              <!-- <i class="iconfont icon-renzheng" title="认证信息"></i> -->
              <i class="layui-badge fly-badge-vip mr10" v-if="page.uid && page.uid.isVip !== '0' ? page.uid.isVip : false">VIP{{page.uid.isVip}}</i>
            </a>
            <span>{{page.created | moment}}</span>
          </div>
          <div class="detail-hits" id="LAY_jieAdmin" data-id="123">
            <span style="padding-right: 10px; color: #FF7200">悬赏：{{page.fav}}积分</span>
          </div>
        </div>
        <div class="layui-btn-container fly-detail-admin pt10">
          <a href="" class="layui-btn layui-btn-sm jie-admin">编辑</a>
          <a href="" class="layui-btn layui-btn-sm jie-admin-collect jie-admin">收藏</a>
        </div>
        <div class="detail-body photos">
          {{page.content}}
        </div>
      </div>
      <!--  回帖相关内容  -->
      <div class="fly-panel detail-box" id="flyReply">
        <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
          <legend>回帖</legend>
        </fieldset>

        <ul class="jieda" id="jieda">
          <li data-id="111" class="jieda-daan">
            <a name="item-1111111111"></a>
            <div class="detail-about detail-about-reply">
              <a class="fly-avatar" href="">
                <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" alt=" ">
              </a>
              <div class="fly-detail-uid">
                <a href="" class="fly-link">
                  <cite>贤心</cite>
                  <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                  <i class="layui-badge fly-badge-vip">VIP3</i>
                </a>

                <span>(楼主)</span>
                <!--
                <span style="color:#5FB878">(管理员)</span>
                <span style="color:#FF9E3F">（社区之光）</span>
                <span style="color:#999">（该号已被封）</span>
                -->
              </div>

              <div class="detail-hits">
                <span>2017-11-30</span>
              </div>

              <i class="iconfont icon-caina" title="最佳答案"></i>
            </div>
            <div class="detail-body jieda-body photos">
              <p>香菇那个蓝瘦，这是一条被采纳的回帖</p>
            </div>
            <div class="jieda-reply">
              <span class="jieda-zan zanok" type="zan">
                <i class="iconfont icon-zan"></i>
                <em>66</em>
              </span>
              <span type="reply">
                <i class="iconfont icon-svgmoban53"></i>
                回复
              </span>
              <div class="jieda-admin">
                <span type="edit">编辑</span>
                <span type="del">删除</span>
                <!-- <span class="jieda-accept" type="accept">采纳</span> -->
              </div>
            </div>
          </li>

          <li data-id="111">
            <a name="item-1111111111"></a>
            <div class="detail-about detail-about-reply">
              <a class="fly-avatar" href="">
                <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" alt=" ">
              </a>
              <div class="fly-detail-uid">
                <a href="" class="fly-link">
                  <cite>贤心</cite>
                </a>
              </div>
              <div class="detail-hits">
                <span>2017-11-30</span>
              </div>
            </div>
            <div class="detail-body jieda-body photos">
              <p>蓝瘦那个香菇，这是一条没被采纳的回帖</p>
            </div>
            <div class="jieda-reply">
              <span class="jieda-zan" type="zan">
                <i class="iconfont icon-zan"></i>
                <em>0</em>
              </span>
              <span type="reply">
                <i class="iconfont icon-svgmoban53"></i>
                回复
              </span>
              <div class="jieda-admin">
                <span type="edit">编辑</span>
                <span type="del">删除</span>
                <span class="jieda-accept" type="accept">采纳</span>
              </div>
            </div>
          </li>

          <!-- 无数据时 -->
          <!-- <li class="fly-none">消灭零回复</li> -->
        </ul>
        <Pagination
        showType="icon"
        :hasSelect="true"
        :total="total"
        :size="size"
        :current="current"
        :showEnd="true"
        @chageCurrent="handleChange"
        ></Pagination>
        <div class="layui-form layui-form-pane">
          <Editor></Editor>
          <div class='layui-form-item'>
            <Validation-Provider
              ref='codeField'
              rules='required|length:4'
              name='code'
              v-slot='{ errors }'
            >
              <div class='layui-row'>
                <label for='L_vercode' class='layui-form-label'
                  >验证码</label
                >
                <div class='layui-input-inline'>
                  <input
                    type='text'
                    name='code'
                    v-model='code'
                    placeholder='请输入验证码'
                    autocomplete='off'
                    class='layui-input'
                    maxlength="4"
                  />
                </div>
                <div class>
                  <span
                    class='svg'
                    style='color: #c00'
                    @click="_getCode()"
                    v-html='svg'
                  ></span>
                </div>
              </div>
              <div class='layui-form-mid'>
                <span style='color: #c00'>{{ errors[0] }}</span>
              </div>
            </Validation-Provider>
          </div>
          <div class="layui-form-item">
            <button type="button" class="layui-btn">提交回复</button>
          </div>
        </div>
      </div>
    </div>
    <div class="layui-col-md4">
      <HotList></HotList>
      <Ads></Ads>
      <Links></Links>
    </div>
  </div>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getDetail } from '@/api/content'
import { getComments } from '@/api/comments'
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import Panel from '@/components/Panel'
import Editor from '@/components/modules/editor/'
import codeMix from '@/mixin/code'
import Pagination from '@/components/modules/pagination/Index'

export default {
  name: 'detail',
  mixins: [codeMix],
  props: ['tid'],
  data () {
  // 这里存放数据
    return {
      total: 101,
      size: 15,
      current: 6,
      page: {},
      comments: []
    }
  },
  components: {
    HotList,
    Ads,
    Links,
    Editor,
    Panel,
    Pagination
  },
  methods: {
    handleChange (val) {
      this.current = val
    },
    getPostDetail () {
      getDetail(this.tid).then(res => {
        if (res.code === 200) {
          this.page = res.data
        }
      })
    },
    getCommentsList () {
      getComments(this.tid).then(res => {
        if (res.code === 200) {
          // this.page = res.data
          // console.log(this.page)
        }
      })
    }
  },
  mounted () {
    this.getPostDetail()
    this.getCommentsList()
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.fly-detail-admin {
  text-align: right;
  border-top: 1px dotted #eee;
  background: #f8f8f8;
}
.fly-detail-info {
  span {
    margin-right: 5px;
  }
}
.jieda-body {
  margin: 25px 0 20px !important;
}
</style>
