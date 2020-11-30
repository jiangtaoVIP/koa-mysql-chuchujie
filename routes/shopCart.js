const router = require('koa-router')()

const shopCart = require('../controller/shopCart')
router.prefix('/shopCart')
// #region
/**
 * @swagger
 * /home/data:
 *   get:
 *     description: 购物车列表
 *     tags: [购物车模块]
 *     produces:
 *       - multipart/form-data
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.get('/getList', shopCart.getList)
module.exports = router
