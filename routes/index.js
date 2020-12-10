const router = require('koa-router')()
const mySqlServer = require("../mysql/index.js")

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/getInfo', async (ctx, next) => {
  await next()
  console.log(ctx.request.query, 'ctx')
  let page = ctx.request.query.page
  let size = ctx.request.query.size
  var sql = `SELECT * FROM shop_user limit ${(1-1)*20},${20};`
  var result = await mySqlServer.mySql(sql)
    if (result) {
        ctx.success(result, '查询成功')
    } else {
      ctx.fail('查询失败', -1)
    }
})

module.exports = router
