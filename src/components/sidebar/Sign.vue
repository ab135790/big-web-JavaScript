<!--
 * @Author: your name
 * @Date: 2020-05-17 16:07:29
 * @LastEditTime: 2020-05-31 21:25:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\components\sidebar\Sign.vue
-->
<template>
  <div class="fly-panel fly-signin">
    <div class="fly-panel-title">
      签到
      <i class="fly-mid"></i>
      <a
        href="javascript:;"
        class="fly-link"
        id="LAY_signinHelp"
        @click="showInfo()"
        >说明</a
      >
      <i class="fly-mid"></i>
      <a
        href="javascript:;"
        class="fly-link"
        id="LAY_signinTop"
        @click="showTop()"
        >活跃榜<span class="layui-badge-dot"></span
      ></a>
      <span class="fly-signin-days" v-show="isSign || isLogin">已连续签到<cite>{{count}}</cite>天</span>
    </div>
    <div class="fly-panel-main fly-signin-main">
     <template v-if="!isSign">
        <button class="layui-btn layui-btn-danger" id="LAY_signin" @click="sign()">
        今日签到
        </button>
        <span>可获得<cite>{{favs}}</cite>飞吻</span>
     </template>
      <!-- 已签到状态 -->
      <template v-else>
        <button class="layui-btn layui-btn-disabled">今日已签到
          <span>剩余</span>
          <span class="pl10">{{ leftHours }}</span>:
          <span class="pl0">{{ leftMinutes }}</span>:
          <span class="pl0">{{ leftSeconds }}</span>
        </button>
        <span>获得了<cite>{{favs}}</cite>飞吻</span>
      </template>
      <sign-info :isShow="isShow" @closeModal="close()"></sign-info>
      <sign-list :showList="showList" @closeModal="close()"></sign-list>
    </div>
  </div>
</template>

<script>
import SignInfo from './SignInfo'
import SignList from './SignList'
import { userSign } from '@/api/user.js'
import moment from 'dayjs'

export default {
  name: 'sign',
  data () {
    return {
      isShow: false,
      showList: false,
      current: 0,
      isSign: false,
      leftHours: '',
      leftMinutes: '',
      leftSeconds: ''
    }
  },
  mounted () {
    // 判断用户的上一次签到时间与签到状态
    // 如果用户上一次签到时间与当天的签到日期相差1天，允许用户进行签到
    const isSign = this.$store.state.userInfo.isSign
    const lastSign = this.$store.state.userInfo.lastSign
    const nowDate = moment().format('YYYY-MM-DD HH:mm:ss')
    const lastDate = moment(lastSign).format('YYYY-MM-DD HH:mm:ss')
    const diff = moment(nowDate).diff(moment(lastDate), 'day')
    if (diff > 0 && isSign) {
      this.isSign = false
    } else {
      this.isSign = isSign
      this.countDowm()
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    favs () {
      let count = parseInt(this.count)
      let result = 0
      if (count < 5) {
        result = 5
      } else if (count >= 5 && count < 15) {
        result = 10
      } else if (count >= 15 && count < 30) {
        result = 15
      } else if (count >= 30 && count < 100) {
        result = 20
      } else if (count >= 100 && count < 365) {
        result = 30
      } else if (count >= 365) {
        result = 50
      }
      return result
    },
    count () {
      if (this.$store.state.userInfo !== {}) {
        if (typeof this.$store.state.userInfo.count !== 'undefined') {
          return this.$store.state.userInfo.count
        } else {
          return 0
        }
      } else {
        return 0
      }
    }
  },
  methods: {
    showInfo () {
      this.isShow = true
    },
    close () {
      this.isShow = false
      this.showList = false
    },
    choose (val) {
      this.current = val
    },
    showTop () {
      this.showList = true
    },
    sign () {
      if (!this.isLogin) {
        this.$pop('shake', '请先登录')
        return
      }
      userSign().then(res => {
        let user = this.$store.state.userInfo
        if (res.code === 200) {
          user.favs = res.favs
          user.count = res.count
          this.$pop('', '签到成功')
          this.countDowm()
        } else {
          //  用户已经签到
          this.$pop('', '请已经签到')
        }
        user.isSign = true
        user.lastSign = res.lastSign
        this.isSign = true
        this.$store.commit('setUserInfo', user)
      })
    },
    countDowm () {
      // 获取现在的时间
      const nowDate = moment().format('YYYY-MM-DD HH:mm:ss')
      // 获取当天的最后时间
      const endDatat = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
      // 获取上述两种时间的按秒差值
      const diff = moment(endDatat).diff(moment(nowDate), 's')
      if (diff < 0) {
        clearTimeout(this.countDowm)
        return
      }
      // 设置剩余签到时间至当天23:59:59，以hh:mm:ss形式展示
      const leftTime = diff
      // 获取小时
      let leftHours = Math.floor(leftTime / 3600)
      // 获取分钟
      let leftMinutes = (leftTime / 3600)
      leftMinutes = Math.floor(('0.' + leftMinutes.toString().split('.')[1]) * 60)
      // 减去剩余秒数后的总秒数
      let leftSeconds = leftTime - leftHours * 60 * 60
      // 减去小时后的总秒数再减去获取的分钟秒数，获得剩余秒数
      leftSeconds = leftSeconds - leftMinutes * 60
      // 优化 10s 以下的显示样式
      this.leftHours = leftHours < 10 ? `0${leftHours}` : leftHours
      this.leftMinutes = leftMinutes < 10 ? `0${leftMinutes}` : leftMinutes
      this.leftSeconds = leftSeconds < 10 ? `0${leftSeconds}` : leftSeconds
      setTimeout(this.countDowm, 1000)
    }
  },
  components: {
    SignList,
    SignInfo
  },
  beforeDestroy () {
    clearTimeout(this.countDowm)
  }
}
</script>

<style lang="scss">
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.mask {
  background: rgba(0, 0, 0, 0.8);
  z-index: 20000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.layui-layer {
  position: fixed;
  width: 300px;
  height: 480px;
  top: 50%;
  left: 50%;
  margin-top: -240px;
  margin-left: -150px;
  background: #fff;
  z-index: 21000;
  &.active {
    animation-fill-mode: both;
    animation-duration: 0.2s;
    animation-name: bounceIn;
  }
  .layui-layer-title {
    height: 42px;
    line-height: 42px;
    color: #333;
    background-color: #f8f8f8;
  }
  .layui-icon-close {
    cursor: pointer;
  }
  .layui-tab-item {
    line-height: 45px;
    li {
      border-bottom: 1px dotted #dcdcdc;
      &:last-child {
        border-bottom: none;
      }
    }
    img {
      width: 30px;
      height: 30px;
      border-radius: 2px;
    }
  }
}
</style>
