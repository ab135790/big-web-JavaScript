/*
 * @Author: your name
 * @Date: 2020-05-17 16:07:29
 * @LastEditTime: 2020-06-07 17:34:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \big-web-JavaScript\src\config\index.js
 */
export default {
  baseUrl: {
    // dev: 'http://localhost:3000',
    dev: 'http://localhost:36742', // mockServer
    pro: 'http://192.168.27.130:12005'
  },
  publicPath: [/^\/public/, /^\/login/]
}
