/*
 * @Author: your name
 * @Date: 2020-05-17 16:07:29
 * @LastEditTime: 2020-06-29 23:05:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\mixin\_mixin.js
 */
import { getList } from '@/api/content'
export const mixin = {
  data () {
    return {
      status: '',
      tag: '',
      sort: '',
      page: 0,
      limit: 20,
      catalog: '',
      current: '',
      lists: []
    }
  },
  methods: {
    /** 2020-2-26 0026
     *作者:王青高
     *功能: 获取数据列表
     *参数:
     */
    _getList () {
      // if (this.isRepeat) return
      if (this.isEnd) return
      this.isRepeat = true
      let options = {
        catalog: this.catalog,
        isTop: this.isTop,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tag: this.tag,
        status: this.status
      }
      getList(options).then(res => {
        // 加入一个请求锁， 防止用户多次点击，等待数据返回，再打开。
        // this.isRepeat = false
        // 对于异常的判断， res.code 非2000, 我们给用户一个提示
        // 判断是否lists长度为0，如果为0即可以直接赋值
        // 当Lists长度不为0，后面请求的数据， 加入到Lists里面来
        if (res.code === 200) {
          // 判断res.data的长度，如果小于20条，则是最后页
          if (res.data.length < this.limit) {
            this.isEnd = true
          }
          if (!this.lists.length) {
            this.lists = res.data
          } else {
            this.lists = this.lists.concat(res.data)
          }
        }
      }).catch(err => {
        // this.isRepeat = false
        if (err) {
          this.$alert(err.message)
        }
      })
    }
  }
}
