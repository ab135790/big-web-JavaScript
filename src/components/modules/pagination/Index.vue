<!--
 * @Author: your name
 * @Date: 2020-06-16 22:29:37
 * @LastEditTime: 2020-06-18 23:29:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\modules\page\Index.vue
-->
<!--  -->
<template>
  <div :style="{'justify-content': align }" class="d-flxe">
      <div class="layui-box layui-laypage layui-laypage-default">
        <a :class="{'layui-disabled': current === 0}" href="javascript:;" class="layui-laypage-prev layui-disabled" v-show="showEnd">
          <i class="layui-icon layui-icon-prev"  v-if="showType === 'icon'"></i><template v-else>首页</template>
        </a>
        <a href="javascript:;" :class="{'layui-disabled': current === 0}"><i class="layui-icon layui-icon-left" v-if="showType === 'icon'"></i>
        <template v-else>上一页</template></a>
        <!-- current + 2 < pages.length 显示 ...  -->
        <!-- current - 2 > 1 显示 ...  -->
        <a v-if="pages.length > 5 && (current + 1 - 2) > 1" href="javascript:;">...</a>
        <template v-for="(item, index) in pages">
          <a v-if="item >= (current - 1) && item <= (current + 3) " href="javascript:;" :key="'item' + index" :class="[current === index ? theme: '',current === index ? 'active': '']">{{item}}</a>
        </template>
        <a v-if="pages.length > 5 && (current + 3) < pages.length" href="javascript:;">...</a>
        <a href="javascript:;" :class="{'layui-disabled': current === pages.length - 1}">
          <i class="layui-icon layui-icon-right" v-if="showType === 'icon'"></i>
          <template v-else>下一页</template>
        </a>
        <a href="javascript:;" class="layui-laypage-next" v-show="showEnd" :class="{'layui-disabled': current === pages.length - 1}">
          <i class="layui-icon layui-icon-next" v-if="showType === 'icon'"></i>
          <template v-else>尾页</template>
        </a>
    </div>
    <div class="total ml20" v-if="hasTotal">到第<input type="text" class="imooc-input plr10">页 共 total 页</div>
    <template v-if="hasSelect">
      <div class="layui-input-inline" @click="chooseFav()">
        <div class="layui-unselect layui-form-select ml10" :class="{'layui-form-selected': isSelect}">
          <div class="layui-select-title">
            <input type="text" placeholder="请选择" readonly v-model="options[optIndex]" class="layui-input layui-unselect">
            <!-- 上下小图标 -->
            <i class="layui-edge"></i>
          </div>
          <dl class="layui-anim layui-anim-upbit">
            <dd v-for="(item, index) in options" :key="'catalog' + index" @click.stop="changeFav(item, index)" :class="{'layui-this': index === optIndex}" >
              {{item}}
            </dd>
          </dl>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import _ from 'lodash'
export default {
  name: 'pagination',
  data () {
  // 这里存放数据
    return {
      optIndex: 0,
      options: [10, 20, 30, 50, 100],
      isSelect: false,
      limit: 10,
      pages: ''
    }
  },
  props: {
    align: {
      type: String,
      default: 'center'
    },
    showType: {
      type: String,
      default: 'text'
    },
    showEnd: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'layui-bg-green'
    },
    hasTotal: {
      type: Boolean,
      default: false
    },
    hasSelect: {
      type: Boolean,
      default: false
    },
    current: {
      type: Number,
      default: 10
    },
    size: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      defualt: 20
    }
  },
  mounted () {
    // 初始化分页的长度
    this.initPages()
    // 设置select的内容
    this.limit = this.size
    this.options = _.uniq(_.sortBy(_.concat(this.options, this.size)))
    this.optIndex = this.options.indexOf(this.size)
  },
  methods: {
    initPages () {
      const len = Math.ceil(this.total / this.size)
      // 5 -> [1, 2, 3, 4, 5]
      this.pages = _.range(1, (len + 1))
      console.log('pages', this.pages)
    },
    chooseFav () {
      this.isSelect = !this.isSelect
    },
    changeFav (item, index) {
      this.optIndex = index
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
 .layui-laypage {
   a {
     margin-right: -1px;
    &.active {
      border-radius: 2px;
      position: relative;
      z-index: 100;
    }
   }
   .layui-bg-green {
     border-color: #009688;
   }
 }
 .total {
   position: relative;
   top: -2px;
   color: rgba(51, 51, 51, .8)
 }
 .imooc-input {
   width: 20px;
   height: 28px;
   line-height: 28px;
 }

 .layui-input {
   height: 28px;
   line-height: 28px;
 }

 .layui-input {
   height: 30px;
   line-height: 30px;
   margin-bottom: 5px;
 }
 .layui-form-select {
   width: 100px;
 }
</style>
