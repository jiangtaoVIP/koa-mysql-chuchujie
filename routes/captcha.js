const router = require('koa-router')()
const captcha = require('../controller/captcha')
router.prefix('/captcha')
router.post('/', captcha.verification)
module.exports = router
