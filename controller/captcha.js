const svgCaptcha = require('svg-captcha')
exports.verification = async (ctx, next) => {
    /*
    生成验证码
    60s刷新一次
    */
   const captcha = svgCaptcha.create({ //这种生成的是随机数验证码
    size: 4,    //验证码长度
    fontSize: 50,   //字体大小
    width: 100,
    height: 40,
    background:'#f6f6f6'
  });
    ctx.session.captcha = captcha.text.toLowerCase()
    ctx.set('Content-Type', 'image/svg+xml')
    ctx.body = captcha.data // 验证码
  }