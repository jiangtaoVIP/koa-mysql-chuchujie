/* eslint-disable no-async-promise-executor */
const EmailConfig = require('../config/email')
const nodemailer = require('nodemailer')

const Redis = require('koa-redis')
//新建redis客户端
const Store =  Redis({ host: EmailConfig.redis.host, port: EmailConfig.redis.port }).client

exports.getEmailVerify = async(ctx) => {
  const { email } = ctx.request.body
  console.log(EmailConfig.smtp.user)
  if (!email) {
    ctx.fail('参数错误', -1)
    return
  }
  // 发送端信息
  let transporter = nodemailer.createTransport({
    service: 'qq', 
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
      user: EmailConfig.smtp.user,
      pass: EmailConfig.smtp.pass
    }
  });
  // 接受端信息 (先生成了时间，可能会延迟一小会儿)
  let ko = {
    code: EmailConfig.smtp.code(),
    expire: EmailConfig.smtp.expire(),
    email,
    user: email
  }
  // 邮件信息
  let mailOptions = {
    from: `《楚楚街商城》<${EmailConfig.smtp.user}>`,
    to: ko.email,
    subject: '网站验证码',
    html: `${ko.user} 您好，您正在使用《楚楚街商城》，验证码是：${ko.code}，5分钟内有效。验证码提供给他人可能导致帐号被盗，请勿泄露，谨防被骗。`
  };
  const allFn = new Promise(async(resolve) => {
    //校验是不是一分钟之内
    const saveExpire = await Store.hget(`nodemail:${email}`, 'expire')
    if (saveExpire !== undefined && new Date().getTime() - saveExpire < 0) {
      resolve('验证请求过于频繁，5分钟内只能发送1次')
    } else {
      //发送邮件
      // eslint-disable-next-line no-unused-vars
      transporter.sendMail(mailOptions, async(error, info) => {
        if (error) {
          console.log(error)
          resolve('发送失败，请输入正确的地址！')
        } else {
          Store.hmset(`nodemail:${ko.user}`, 'code', ko.code)
          Store.hmset(`nodemail:${ko.user}`, 'expire', ko.expire)
          Store.hmset(`nodemail:${ko.user}`, 'email', ko.email)
          resolve(0)
        }
      })
    }
  })
  const res = await allFn
  if (res == 0) {
    ctx.success('', '发送成功')
  } else {
    ctx.fail(res, -1)
  }
}
