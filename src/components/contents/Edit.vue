<!--
 * @Author: your name
 * @Date: 2020-06-07 14:01:18
 * @LastEditTime: 2020-06-29 00:04:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\contents\Add.vue
-->
<!--  -->
<template>
<div class="layui-container fly-marginTop">
  <div class="fly-panel" pad20 style="padding-top: 5px;">
    <!--<div class="fly-none">没有权限</div>-->
    <div class="layui-form layui-form-pane">
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">编辑帖子</li>
        </ul>
          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
            <div class="layui-tab-item layui-show">
              <validationObserver ref='observer' v-slot='{ validate }'>
                <div class="layui-row layui-col-space15 layui-form-item">
                  <div class="layui-col-md3">
                    <div class="layui-row">
                        <label class="layui-form-label">所在专栏</label>
                        <div class="layui-input-block">
                          <div class="layui-unselect layui-form-select">
                            <div class="layui-select-title">
                              <input type="text" placeholder="请选择" readonly v-model="catalogs[cataIndex].text" class="layui-input layui-unselect layui-disabled">
                              <!-- 上下小图标 -->
                              <i class="layui-edge"></i>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                  <div class="layui-col-md9">
                      <div class="layui-row">
                        <label for="L_title" class="layui-form-label">标题</label>
                        <div class="layui-input-block">
                          <input type="text" id="L_title" v-model="title" name="title" autocomplete="off" class="layui-input">
                          <!-- <input type="hidden" name="id" value="{{d.edit.id}}"> -->
                        </div>
                      </div>
                  </div>
                </div>
                <editor @changeContent="add" :initContent="content"></editor>
                <div class="layui-form-item">
                  <div class="layui-inline">
                    <label class="layui-form-label">悬赏飞吻</label>
                    <div class="layui-input-inline">
                      <div class="layui-unselect layui-form-select">
                        <div class="layui-select-title">
                          <input type="text" placeholder="请选择" readonly v-model="favList[favIndex]" class="layui-input layui-unselect layui-disabled">
                          <!-- 上下小图标 -->
                          <i class="layui-edge"></i>
                        </div>
                      </div>
                    </div>
                    <div class="layui-form-mid layui-word-aux">发表后无法更改飞吻</div>
                  </div>
                </div>
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
                  <button type="button" class="layui-btn" @click="validate().then(_submit)">立即发布</button>
                </div>
              </validationObserver>
            </div>
          </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { updatePost } from '@/api/content'
import codeMix from '@/mixin/code'
import Editor from '@/components/modules/editor/'
export default {
  name: 'edit',
  mixins: [codeMix],
  props: ['tid', 'page'],
  data () {
  // 这里存放数据
    return {
      cataIndex: 0,
      favIndex: 0,
      catalogs: [
        {
          text: '请选择',
          value: '-1'
        },
        {
          text: '提问',
          value: 'ask'
        },
        {
          text: '分享',
          value: 'share'
        },
        {
          text: '讨论',
          value: 'discuss'
        },
        {
          text: '建议',
          value: 'advise'
        }
      ],
      favList: [20, 30, 50, 60, 80],
      content: '',
      title: ''
    }
  },
  components: {
    Editor
  },
  methods: {
    async _submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        // ABORT
        return
      }
      if (this.content.trim() === '') {
        this.$alert('文章内容不为空')
        return
      }
      // 更新文章
      updatePost({
        tid: this.tid,
        title: this.title,
        catalog: this.catalogs[this.cataIndex],
        content: this.content,
        fav: this.favList[this.favIndex],
        sid: this.$store.state.sid,
        code: this.code
      }).then(res => {
        if (res.code === 200) {
          localStorage.setItem('editData', '')
          this.$pop('', res.msg)
          setTimeout(() => {
            this.$router.push({ name: 'detail', params: { tid: this.tid } })
          }, 1000)
        } else {
          this.$alert(res.msg)
        }
      })
    },
    add (val) {
      this.content = val
      const saveData = {
        title: this.title,
        cataIndex: this.cataIndex,
        content: this.content,
        favIndex: this.favIndex
      }
      if (this.title.trim() !== '' && this.content.trim() !== '') {
        const editData = localStorage.getItem('editData')
        if (editData && editData !== '') {
          // eslint-disable-next-line no-unused-vars
          let newObj = {}
          newObj = { ...saveData, ...JSON.parse(editData) }
        }
        localStorage.setItem('editData', JSON.stringify(saveData))
      }
    },
    isDrop (num) {
      switch (num) {
        case 1:
          this.isSelect = !this.isSelect
          break
        case 2:
          this.isSelect_fav = !this.isSelect_fav
          break
        default:
          this.isSelect = !this.isSelect
      }
    }
  },
  mounted () {
    if (this.page) {
      console.log(this.page)
      this.content = this.page.content
      this.title = this.page.title
      this.favIndex = this.favList.indexOf(parseInt(this.page.fav))
      this.cataIndex = this.catalogs.indexOf(this.catalogs.filter(item => item.value === this.page.catalog.value)[0])
      // 缓存edit内容
      localStorage.setItem('editData', JSON.stringify(this.page))
    } else {
      // 页面上无page内容，可能是用户进行了刷新，则取本地缓存的内容
      const saveData = localStorage.getItem('editData')
      if (saveData && saveData !== '') {
        this.$confirm('是否加载未编辑完的内容？', () => {
          const obj = JSON.parse(saveData)
          this.content = obj.content
          this.title = obj.title
          this.cataIndex = obj.cataIndex
          this.favIndex = obj.favIndex
        }, () => {
          localStorage.setItem('editData', '')
        })
      }
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
</style>
