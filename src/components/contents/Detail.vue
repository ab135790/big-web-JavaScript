<!--
 * @Author: your name
 * @Date: 2020-06-16 22:03:57
 * @LastEditTime: 2020-07-12 21:40:11
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
          <span class="layui-badge layui-bg-green fly-detail-column" v-if="page.catalog && page.catalog.value === 'logs'">动态</span>
          <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog && page.catalog.value === 'share'">分享</span>
          <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog && page.catalog.value === 'ask'">提问</span>
          <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog && page.catalog.value === 'advise'">建议</span>
          <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog && page.catalog.value === 'discuss'">交流</span>
          <span class="layui-badge layui-bg-green fly-detail-column" v-else-if="page.catalog && page.catalog.value === 'notice'">公告</span>

          <span class="layui-badge" style="background-color: #999;" v-if="page.isEnd === '0'">未结</span>
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
        <div class="detail-about" v-if="Object.keys(page).length">
          <router-link class="fly-avatar" :to="{name: 'user', params: { uid: page.uid._id }}">
            <img :src="page.uid ? page.uid.pic : require('@/assets/img/default.png')">
          </router-link>
          <div class="fly-detail-uid">
            <!-- :to="{name: 'user', params: { uid: page.uid._id }}" -->
            <router-link class="fly-link" :to="{name: 'user', params: { uid: page.uid ? page.uid._id: '' }}">
              <cite>{{page.uid ? page.uid.name : 'testName'}}</cite>
              <i class="layui-badge fly-badge-vip mr10" v-if="page.uid && page.uid.isVip !== '0' ? page.uid.isVip : false">VIP{{page.uid.isVip}}</i>
            </router-link>
            <span>{{page.created | moment}}</span>
          </div>
          <div class="detail-hits" id="LAY_jieAdmin" data-id="123">
            <span style="padding-right: 10px; color: #FF7200">悬赏：{{page.fav}}积分</span>
          </div>
        </div>
        <div class="layui-btn-container fly-detail-admin pt10">
          <router-link :to="{ name: 'edit', params: { tid: tid, 'page': page }}" class="layui-btn layui-btn-sm jie-admin" v-show="page.isEnd === '0'">编辑</router-link>
          <a
          class="layui-btn layui-btn-sm jie-admin-collect"
          :class="{'layui-btn-primary': page.isFav}"
          @click.prevent="setCollect()">{{page.isFav? '取消收藏' : '收藏'}}</a>
        </div>
        <div class="detail-body photos" v-html="content"></div>
      </div>
      <!--  回帖相关内容  -->
      <div class="fly-panel detail-box" id="flyReply">
        <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
          <legend>回帖</legend>
        </fieldset>

        <ul class="jieda" id="jieda">
          <template v-if="comments.length">
            <li class="jieda-daan" v-for="(item, index) in comments" :key="'comments' + index">
              <div class="detail-about detail-about-reply">
                <a class="fly-avatar" href="">
                  <img :src="item.cuid ? item.cuid.pic : require('@/assets/img/default.png')">
                </a>
                <div class="fly-detail-user">
                  <router-link :to="{name: 'user', params: { uid: item.cuid._id }}" class="fly-link">
                    <cite>{{item.cuid ? item.cuid.name : 'imooc'}}</cite>
                    <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
                    <i v-if="item.cuid && item.cuid.isVip !== '0' ? item.cuid.isVip : false" class="layui-badge fly-badge-vip">VIP{{item.cuid.isVip}}</i>
                  </router-link>

                  <span v-if="index === 0">(楼主)</span>
                  <!--
                  <span style="color:#5FB878">(管理员)</span>
                  <span style="color:#FF9E3F">（社区之光）</span>
                  <span style="color:#999">（该号已被封）</span>
                  -->
                </div>

                <div class="detail-hits">
                  <span>{{item.created | moment}}</span>
                </div>

                <i class="iconfont icon-caina" title="最佳答案" v-show="item.isBest === '1'"></i>
              </div>
              <div
              class="detail-body jieda-body photos"
              v-richtext="item.content"
              ></div>
              <div class="jieda-reply">
                <span
                class="jieda-zan"
                @click="hands(item)"
                :class="{ zanok: item.handed === '1' }">
                  <i class="iconfont icon-zan"></i>
                  <em>{{item.hands}}</em>
                </span>
                <span type="reply" @click="reply(item)">
                  <i class="iconfont icon-svgmoban53"></i>
                  回复
                </span>
                <div class="jieda-admin">
                  <span v-show="page.isEnd === '0' && item.cuid._id === user._id" @click="editComment(item)">编辑</span>
                  <!-- <span type="del">删除</span> -->
                  <span class="jieda-accept" v-show="page.isEnd === '0' && item.cuid._id === user._id" @click="setBest(item, index)">采纳</span>
                </div>
              </div>
            </li>
          </template>

          <!-- 无数据时 -->
          <li class="fly-none" v-if="comments.length === 0">消灭零回复</li>
        </ul>
        <Pagination
        v-show="comments.length && total > 0"
        showType="icon"
        :hasSelect="false"
        :total="total"
        :size="size"
        :hasTotal="true"
        :current="current"
        :showEnd="true"
        @chageCurrent="handleChange"
        @changeLimit="handleLimit"
        ></Pagination>
        <div class="layui-form layui-form-pane">
          <ValidationObserver ref="observer" v-slot='{ validate }'>
            <Editor
            @changeContent="addCommentContent"
            :initContent="editInfo.content"
            ></Editor>
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
              <button type="button" class="layui-btn" @click="validate().then(_submit)">提交回复</button>
            </div>
          </ValidationObserver>
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
import { getComments, addComment, updateComment, setCommentBest, setHands } from '@/api/comments'
import { addCollect } from '@/api/user'
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import Panel from '@/components/Panel'
import Editor from '@/components/modules/editor/'
import codeMix from '@/mixin/code'
import Pagination from '@/components/modules/pagination/Index'
import { escapeHtml } from '@/utils/escapeHtml'
import { scrollToElem } from '@/utils/common'

export default {
  name: 'detail',
  mixins: [codeMix],
  props: ['tid'],
  data () {
  // 这里存放数据
    return {
      total: 0,
      size: 10,
      current: 0,
      page: {},
      comments: [],
      editInfo: {
        content: '',
        code: '',
        sid: ''
      }
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
  watch: {
    tid (newval, oldval) {
      this.getPostDetail()
      this.getCommentsList()
    }
  },
  methods: {
    handleChange (val) {
      this.current = val
      this.getCommentsList()
    },
    getPostDetail () {
      getDetail(this.tid).then(res => {
        if (res.code === 200) {
          this.page = res.data
        }
      })
    },
    handleLimit (val) {
      this.size = val
      this.getCommentsList()
    },
    getCommentsList () {
      getComments({
        tid: this.tid,
        page: this.current,
        limit: this.size
      }).then(res => {
        if (res.code === 200) {
          this.comments = res.data
          this.total = res.total
        }
      })
    },
    async _submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        // ABORT
        return
      }
      // 用户未登录
      const isLogin = this.$store.state.isLogin
      if (!isLogin) {
        this.$pop('shake', '请先登录')
        return
      }
      // 用户禁言状态判断
      const user = this.$store.state.userInfo
      if (user.status !== '0') {
        this.$pop('shake', '用户已经禁言，请联系管理员')
        return
      }
      this.editInfo.code = this.code
      this.editInfo.sid = this.$store.state.sid
      this.editInfo.tid = this.tid // 帖子id
      // 获取评论用户的信息:图片、昵称、vip
      const cuid = {
        _id: user._id,
        pic: user.pic,
        name: user.name,
        isVip: user.isVip
      }
      if (typeof this.editInfo.cid !== 'undefined' && this.editInfo.cid !== '') {
        const obj = { ...this.editInfo }
        delete obj['item']
        // 判断用户是否修改了内容
        if (this.editInfo.content === this.editInfo.item.content) return
        // 更新评论
        updateComment(obj).then(res => {
          if (res.code === 200) {
            const temp = this.editInfo.item
            temp.content = this.editInfo.content
            this.code = ''
            this.editInfo.content = ''
            // 方法一 只用更新特定的一条content created， $set
            // 方法二，更新整个数组中的这一条
            this.comments.splice(this.comments.indexOf(this.editInfo.item), 1, temp)
          }
          // 刷新图形验证码
          this._getCode()
          this.$pop('', res.msg)
        })
      } else {
        // 添加评论
        addComment(this.editInfo).then(res => {
          if (res.code === 200) {
            // 发表成功后，清空评论内容
            this.code = ''
            this.editInfo.content = ''
            // 添加新的评论到评论列表
            res.data.cuid = cuid
            this.comments.push(res.data)
            requestAnimationFrame(() => {
              this.$refs.observer && this.$refs.observer.reset()
            })
          }
          // 刷新图形验证码
          this._getCode()
          this.$pop('', res.msg)
        })
      }
    },
    addCommentContent (val) {
      this.editInfo.content = val
    },
    editComment (item) {
      this.editInfo.content = item.content
      // 动态滚动到输入框的位置，并且进行focus
      scrollToElem('.layui-input-block', 500, -65)
      document.getElementById('edit').focus()
      // 确定需要去编辑的记录
      this.editInfo.cid = item._id
      this.editInfo.item = item
    },
    setBest (item) {
      this.$confirm('确定采纳为最佳答案吗？', () => {
        // 发送采纳最佳答案请求
        setCommentBest({
          cid: item._id,
          tid: this.tid
        }).then(res => {
          if (res.code === 200) {
            this.$pop('', '设置最佳答案成功!')
            item.isBest = '1'
            this.page.isEnd = '1'
          }
        })
      }, () => {})
    },
    hands (item) {
      console.log()
      setHands({ cid: item._id }).then(res => {
        if (res.code === 200) {
          item.handed = '1'
          item.hands += 1
        }
        this.$pop('', res.msg)
      })
    },
    reply (item) {
      // 插入@ + name 到 content
      // 滚动页面到输入框
      // focus 输入框
      const reg = /^@[\S]+/g
      if (this.editInfo.content) {
        if (reg.test(this.editInfo.content)) {
          this.editInfo.content = this.editInfo.content.replace(reg, '@' + item.cuid.name + '')
        } else {
          if (this.editInfo.content !== '') {
            this.editInfo.content = `@${item.cuid.name} ${this.editInfo.content}`
          } else {
            this.editInfo.content = '@' + item.cuid.name
          }
        }
      } else {
        // 评论框为空
        this.editInfo.content = '@' + item.cuid.name + ' '
      }
      // 动态滚动到输入框的位置，并且进行focus
      scrollToElem('.layui-input-block', 500, -65)
      document.getElementById('edit').focus()
    },
    // 设置收藏 && 取消收藏
    setCollect () {
      const isLogin = this.$store.state.isLogin
      if (isLogin) {
        const collect = {
          tid: this.tid,
          title: this.page.title,
          isFav: this.page.isFav ? 1 : 0
        }
        addCollect(collect).then(res => {
          if (res.code === 200) {
            this.page.isFav = !this.page.isFav
            this.$pop('', this.page.isFav ? '设置收藏成功' : '取消收藏成功')
          }
        })
      } else {
        this.$pop('shake', '请先登录后在进行收藏')
      }
    }
  },
  computed: {
    content () {
      if (this.page.content && this.page.content.trim() === '') {
        return ''
      }
      return escapeHtml(this.page.content)
    },
    user () {
      return this.$store.state.userInfo
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
