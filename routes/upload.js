const router = require('koa-router')()

const upload = require('../controller/upload')
router.prefix('/upload')
router.post('/image', upload.image)

module.exports = router
