const Koa = require('koa')
const app = new Koa()
const path = require('path')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser')

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
const koaSwagger = require('koa2-swagger-ui').koaSwagger;

const cors = require('koa2-cors')

const static = require('koa-static')

const index = require('./routes/index')
const users = require('./routes/users')
const captcha = require('./routes/captcha')
const upload = require('./routes/upload')
const address = require('./routes/address')
const goods = require('./routes/goods')
const home = require('./routes/home')
const shopCart = require('./routes/shopCart')
const adminUser = require('./routes/adminUser')
// error handler
onerror(app)

// swagger配置
const swagger = require('./config/swagger');
app.use(swagger.routes(), swagger.allowedMethods())
app.use(
  koaSwagger({
    routePrefix: '/swagger', // host at /swagger instead of default /docs
    swaggerOptions: {
      url: '/swagger.json' // example path to json
    }
  })
);
// 跨域
app.use(cors({
  credentials: true
}))

// middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))
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
          ctx.status = 200
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
      keepExtensions: true,
      maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
    }
}))

// gzip 压缩
const compress = require('koa-compress')
// const options = { threshold: 2048 }
// app.use(compress(options))
app.use(
  compress({
    filter: function(content_type) { // 只有在请求的content-type中有gzip类型，我们才会考虑压缩，因为zlib是压缩成gzip类型的
      return /text/i.test(content_type);
    },
    threshold: 1024, // 阀值，当数据超过1kb的时候，可以压缩
    flush: require('zlib').Z_SYNC_FLUSH // zlib是node的压缩模块
  })
)
// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(captcha.routes(), captcha.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())
app.use(address.routes(), address.allowedMethods())
app.use(goods.routes(), goods.allowedMethods())
app.use(home.routes(), home.allowedMethods())
app.use(shopCart.routes(), shopCart.allowedMethods())
app.use(adminUser.routes(), adminUser.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
