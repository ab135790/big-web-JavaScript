/*
 * @Author: your name
 * @Date: 2020-07-12 19:29:08
 * @LastEditTime: 2020-07-13 21:30:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\utils\websocket.js
 */
import store from '@/store'

class WebSocketClient {
  constructor (config = {}) {
    const defaultConfig = {
      url: '127.0.0.1',
      port: '3001',
      protocol: 'ws',
      timeInterval: 5 * 1000
    }
    const finalConfig = { ...defaultConfig, ...config }
    this.wss = {}
    this.port = finalConfig.port
    this.url = finalConfig.url
    this.protocol = finalConfig.protocol
    this.handle = null
    this.timeInterval = finalConfig.timeInterval
  }
  init () {
    this.ws = new WebSocket(`${this.protocol}://${this.url}:${this.port}`)
    this.ws.onopen = () => this.onOpen()
    this.ws.onmessage = msg => this.onMessage(msg)
    this.ws.onclose = () => this.onClose()
    this.ws.onerror = () => this.onError()
  }

  send (msg) {
    this.ws.send(msg)
  }

  onOpen () {
    // 发起鉴权请求
    this.send(JSON.stringify({
      event: 'auth',
      message: 'Bearer ' + store.state.token
    }))
    this.checkServer()
  }
  onMessage (event) {
    if (this.isShow) return
    let obj = JSON.parse(event.data)
    switch (obj.event) {
      case 'noauth':
        // 鉴权失败
        // 路由跳转到 /login 重新获取token
        // this.$router.push({ name: 'login' })
        break
      case 'heartbeat':
        this.checkServer()
        this.ws.send(JSON.stringify({
          event: 'heartbeat',
          message: 'pong'
        }))
        break
      default:
        store.dispatch(obj.event, obj)
        // if (obj.name !== this.name) {
        //   // 接收正常的聊天
        //   this.lists.push(obj.name + ':' + obj.message)
        // }
    }
  }
  onClose () {
    this.ws.close()
  }
  onError () {
    setTimeout(() => {
      this.init()
    }, 2000)
  }
  checkServer () {
    clearTimeout(this.handle)
    this.handle = setTimeout(() => {
      this.onClose()
      this.onError()
      // 设置1ms的延时，调试在服务器测未及时响应时，客户端的反应
    }, this.timeInterval + 1000)
  }
}

export default WebSocketClient
