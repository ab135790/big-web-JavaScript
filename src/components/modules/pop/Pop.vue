<!--
 * @Author: your name
 * @Date: 2020-05-30 21:13:49
 * @LastEditTime: 2020-05-30 21:23:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\modules\alert\pop\Pop.vue
-->
<!--  -->
<template>
  <div class="tips animation" v-show="isShow" ref="tips" :class="{'shake': type === 'shake'}">
    <div class='content ptb10'>{{msg}}</div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'Pop',
  data () {
  // 这里存放数据
    return {

    }
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    msg: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isShow (newval, oldval) {
      if (newval !== oldval && newval === true) {
        setTimeout(() => {
          let height = this.$refs.tips.clientHiehgt
          let width = this.$refs.tips.clientWidth
          this.$refs.tips.style.marginLeft = -width / 2 + 'px'
          this.$refs.tips.style.marginTop = -height / 2 + 'px'
        }, 0)
        setTimeout(() => {
          this.isShow = false
          this.msg = ''
          this.type = ''
        }, 3000)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
@keyframes shake {
  0%, 100% {
    transform: translateX(0)
  }

  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-10px)
  }

  20%, 40%, 60%, 80% {
    transform: translateX(10px)
  }
}
.tips {
  position: fixed;
  left: 50%;
  top: 50%;
}
.animation {
  animation-fill-mode: both;
  animation-duration: .3s;
}
.content {
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 6px;
}
.shake {
  animation-name: shake;
}
</style>
