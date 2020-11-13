const Koa = require('koa')
const app = new Koa()
const path = require('path')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')

const logger = require('koa-logger')
// 引入中间件 统一消息返回处理
const routerResponse =  require('./middleware/routerResponse')
// 引入 jwt
const koajwt = require('koa-jwt')

// 引入 koa-session
const Koa_Session = require('koa-session')
// signed属性签名key
const session_signed_key = ['appletsystem']
const sessionConfig = require('./config/session')

const cors = require('koa2-cors');

const static = require('koa-static');

const index = require('./routes/index')
const users = require('./routes/users')
const captcha = require('./routes/captcha')
const upload = require('./routes/upload')
const address = require('./routes/address')

// error handler
onerror(app)

// 跨域
app.use(cors({
  credentials: true
}))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

// 设置整个服务器端口为静态资源文件 本来想设置多个文件夹 未能解决
app.use(static(__dirname))
// app.use(require('koa-static')(__dirname + '/upload'))
// app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

app.use(routerResponse()) //使用

// 利用koa的中间件在总路由中进行拦截处理。只要存在拼装了token字段的参数，就进行验证。此方法最大的优点就是遍历，但注意的一点是，需要在后端总路由拦截时做好架构，以免对其他路由造成干扰。
app.use(async (ctx, next) => {
  if (ctx.header.token) {
    ctx.request.header = Object.assign(ctx.request.header, {'authorization': "Bearer " + (ctx.request.header.token || '')})
    delete ctx.request.header.token
  }
  await next()
})

//jwt
app.use((ctx, next) => {
  return next().catch((err) => {
      if(err.status === 401){
          ctx.status = 401
          ctx.fail('未登陆', -1);
      }else{
          throw err
      }
  })
})

app.use(koajwt({
  secret: 'my_token'
}).unless({
  path: [/\/user\/login/, /\/user\/register/, /\/captcha/, /\/favicon/, /\/upload/]
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// session 实例化
const session = Koa_Session(sessionConfig, app)
app.keys = session_signed_key
app.use(session)

// koa-body
const koaBody = require('koa-body')
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 10000*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(captcha.routes(), captcha.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())
app.use(address.routes(), address.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
