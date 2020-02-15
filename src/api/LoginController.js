import send from '../config/MailConfig'
import moment from 'moment'

class LoginController {
  constructor() {}
  async forget(ctx) {
    const { body } = ctx.request;
    console.log('body', body);
    try {
      // body.username -> database -> email
      let result = await send({
        code: '1234',
        expire: moment()
          .add(30, 'minutes')
          .format('YYYY-MM-DD HH:mm:ss'),
        email: body.username,
        user: 'Brian',
      });
      ctx.body = {
        code: 200,
        data: result,
        msg: '邮件发送成功',
      }
    } catch (e) {
      console.log(e)
    }
  }

  /** 2020-2-15 0015
   *作者:青型科技
   *功能: 接收用户数据，
   * 验证图片验证码的时效性、正确性，
   * 验证用户账号密码是否正确，
   * 返回token
   *参数:
   */
  async login (ctx) {
    const { loginBody } = ctx.request;
    console.log('loginBody', loginBody);
  }

  /** 2020-2-15 0015
   *作者:青型科技
   *功能: 接收用户注册数据
   * 验证图片验证码的时效性、正确性，
   * 验证账号是否符合并存档
   *参数:
   */
  async reg (ctx) {
    const { regBody } = ctx.request;
    console.log('regBody', regBody);
  }
}

export default new LoginController()
