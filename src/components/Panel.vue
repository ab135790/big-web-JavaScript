<template>
  <div class="fly-panel fly-column">
    <div class="layui-container">
      <ul class="layui-clear">
        <router-link tag="li" to="/" class="layui-hide-xs">首页</router-link>
        <router-link
          tag="li"
          v-for="(item, index) of lists"
          :key="'panel' + index"
          :to="item.path"
        >
          <a href="">
            {{item.name}}
            <span class="layui-badge-dot" v-if="item.isNew"></span>
          </a>
        </router-link>
        <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><span class="fly-mid"></span></li>

        <!-- 用户登入后显示 -->
        <template v-if="isLogin">
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><router-link :to="{name: 'myPost'}">我发表的贴</router-link></li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><router-link :to="{name: 'myCollection'}">我收藏的贴</router-link></li>
        </template>
      </ul>
      <div class="fly-column-right layui-hide-xs">
        <span class="fly-search"><i class="layui-icon"></i></span>
        <router-link  :to="{name: 'add'}" class="layui-btn">发表新帖</router-link>
      </div>
      <div class="layui-hide-sm layui-show-xs-block" style="margin-top: -10px; padding-bottom: 10px; text-align: center;">
        <router-link  :to="{name: 'add'}" class="layui-btn">发表新帖</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
export default {
  name: 'Panel',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      lists: [
        {
          name: '提问',
          path: '/index/ask',
          isNew: false
        },
        {
          name: '分享',
          path: '/index/share',
          isNew: true

        },
        {
          name: '讨论',
          path: '/index/discuss',
          isNew: false
        },
        {
          name: '建议',
          path: '/index/advise',
          isNew: false
        },
        {
          name: '公告',
          path: '/index/notice',
          isNew: false
        },
        {
          name: '动态',
          path: '/index/logs',
          isNew: false
        }
      ],
      isLogin: this.$store.state.isLogin
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {},
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="scss" scoped>
  // @import url(); 引入公共css类
  /*.panel {*/
  /*  position: relative;*/
  /*  height: 50px;*/
  /*  line-height: 50px;*/
  /*  margin-bottom: 15px;*/
  /*  border-radius: 2px;*/
  /*  background-color: #fff;*/
  /*  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);*/
  /*  &_nav {*/
  /*    &_li {*/
  /*      display: inline-block;*/
  /*       a {*/
  /*        padding: 0 20px;*/
  /*      }*/
  /*      &_line {*/
  /*        display: inline-block;*/
  /*        height: 10px;*/
  /*        width: 1px;*/
  /*        background: #e2e2e2;*/
  /*        vertical-align: middle;*/
  /*        margin: 0 2px;*/
  /*      }*/
  /*    }*/
  /*  }*/
  /*  &_right {*/
  /*    position: absolute;*/
  /*    right: 0;*/
  /*    top: 0;*/
  /*    .layui-icon-search {*/
  /*      margin-right: 10px;*/
  /*      font-size: 20px;*/
  /*      &:hover {*/
  /*        color: #5fb878;*/
  /*        cursor: pointer;*/
  /*      }*/
  /*    }*/
  /*  }*/
  /*}*/
  /*@media (max-width: 768px) {*/
  /*  !*最大宽度，即 <768 *!*/
  /*  .panel {*/
  /*    height: auto;*/
  /*    &_nav {*/
  /*      &_li {*/
  /*        width: 33.3%;*/
  /*      }*/
  /*    }*/
  /*  }*/
  /*}*/
</style>
