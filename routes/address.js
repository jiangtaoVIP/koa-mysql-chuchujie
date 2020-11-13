const router = require('koa-router')()
const address = require('../controller/address')
router.prefix('/address')
router.post('/add', address.add)
router.post('/edit', address.edit)
router.post('/delete', address.delete)
router.get('/getList', address.getList)
module.exports = router
