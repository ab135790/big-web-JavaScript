<!--
 * @Author: your name
 * @Date: 2020-06-07 14:01:18
 * @LastEditTime: 2020-06-07 17:38:05
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
          <li class="layui-this">发表新帖<!-- 编辑帖子 --></li>
        </ul>
          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
            <div class="layui-tab-item layui-show">
              <validationObserver ref='observer' v-slot='{ validate }'>
                <div class="layui-row layui-col-space15 layui-form-item">
                  <div class="layui-col-md3">
                    <label class="layui-form-label">所在专栏</label>
                    <div class="layui-input-block" @click="() => this.isSelect = !this.isSelect">
                      <div class="layui-unselect layui-form-select" :class="{'layui-form-selected': isSelect}">
                        <div class="layui-select-title">
                          <input type="text" placeholder="请选择" readonly v-model="catalogs[cataIndex].text" class="layui-input layui-unselect">
                          <!-- 上下小图标 -->
                          <i class="layui-edge"></i>
                        </div>
                        <dl class="layui-anim layui-anim-upbit">
                          <dd v-for="(item, index) in catalogs" :key="'catalog' + index" @click.stop="chooseCatalog(item, index)" :class="{'layui-this': index === cataIndex}" >
                            {{item.text}}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div class="layui-col-md9">
                    <label for="L_title" class="layui-form-label">标题</label>
                    <div class="layui-input-block">
                      <input type="text" id="L_title" name="title" required lay-verify="required" autocomplete="off" class="layui-input">
                      <!-- <input type="hidden" name="id" value="{{d.edit.id}}"> -->
                    </div>
                  </div>
                </div>
                <editor></editor>
                <div class="layui-form-item">
                  <div class="layui-inline">
                    <label class="layui-form-label">悬赏飞吻</label>
                    <div class="layui-input-inline" @click="() => this.isSelect_fav = !this.isSelect_fav">
                      <div class="layui-unselect layui-form-select" :class="{'layui-form-selected': isSelect_fav}">
                        <div class="layui-select-title">
                          <input type="text" placeholder="请选择" readonly v-model="favList[favIndex]" class="layui-input layui-unselect">
                          <!-- 上下小图标 -->
                          <i class="layui-edge"></i>
                        </div>
                        <dl class="layui-anim layui-anim-upbit">
                          <dd v-for="(item, index) in favList" :key="'catalog' + index" @click.stop="chooseFavList(item, index)" :class="{'layui-this': index === favIndex}" >
                            {{item}}
                          </dd>
                        </dl>
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
                  <button class="layui-btn" @click="validate().then(_submit)">立即发布</button>
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
import codeMix from '@/mixin/code'
import Editor from '@/components/modules/editor/'
export default {
  name: 'add',
  mixins: [codeMix],
  data () {
  // 这里存放数据
    return {
      isSelect: false,
      isSelect_fav: false,
      cataIndex: 0,
      favIndex: 0,
      catalogs: [
        {
          text: '请选择',
          value: ''
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
      favList: [20, 30, 50, 60, 80]
    }
  },
  components: {
    Editor
  },
  methods: {
    chooseCatalog (item, index) {
      this.cataIndex = index
    },
    chooseFavList (item, index) {
      this.favIndex = index
    },
    async _submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        // ABORT
        return
      }
      console.log('11')
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
</style>
