const router = require('koa-router')()
// const mySqlServer = require("../mysql/index.js")
const user = require('../controller/user')
router.prefix('/user')

router.get('/getList', user.getList)
router.post('/login', user.login)
router.post('/register', user.register)
module.exports = router
