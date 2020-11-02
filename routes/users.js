const router = require('koa-router')()
// const mySqlServer = require("../mysql/index.js")
const user = require('../controller/user')
router.prefix('/user')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})
router.get('/getList', user.getList)

module.exports = router
