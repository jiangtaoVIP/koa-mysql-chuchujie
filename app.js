const Koa = require('koa')
const app = new Koa()
const path = require('path')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser')
const fs = require('fs')
const logger = require('koa-logger')
// 引入中间件 统一消息返回处理
const routerResponse =  require('./middleware/routerResponse')
// 引入 jwt
const koajwt = require('koa-jwt')

const cors = require('koa2-cors')

// const static = require('koa-static')
const staticCache = require('koa-static-cache')
// error handler
onerror(app)

// swagger配置
const koaSwagger = require('koa2-swagger-ui').koaSwagger;
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
app.use(
  cors({
    origin: function(ctx) { //设置允许来自指定域名请求
        // if (ctx.url === '/test') {
        //     return '*'; // 允许来自所有域名请求
        // }
        // return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
        return ctx.header.origin
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    // allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
)

// middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))
app.use(json())
app.use(logger())

// 设置整个服务器端口为静态资源文件 本来想设置多个文件夹 未能解决
// console.log(__dirname, path.join(__dirname, '../shop-files'), '__dirname')
// app.use(static(path.join(__dirname, '../shop-files')))
// app.use(require('koa-static')(__dirname + '/upload'))
app.use(require('koa-static')(path.join(__dirname, '../shop-files')))

// 缓存
app.use(staticCache(path.join(__dirname, '../shop-files'), { dynamic: true }, {
  maxAge: 365 * 24 * 60 * 60
}))

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
  secret: 'user_token'
}).unless({
  path: [/\/user\/login/, /\/user\/resetPass/, /\/user\/register/, /\/captcha/, /\/favicon/, /\/upload/, /\/emailVerify/, /\/image/]
}))
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 引入 koa-session
const Koa_Session = require('koa-session')
// signed属性签名key
const session_signed_key = ['appletsystem']
const sessionConfig = require('./config/session')
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
      maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认200M
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
// 直接引入文件夹的全部路由
fs.readdir('./routes', (err, files) => {
  if (!err) {
    if (files.length > 0) {
      files.forEach(item => {
        app.use(require(`./routes/${item}`).routes())
      })
    }
  }
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
