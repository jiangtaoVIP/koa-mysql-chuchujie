const router = require('koa-router')()

const shopCart = require('../controller/shopCart')
router.prefix('/shopCart')
// #region
/**
 * @swagger
 * /shopCart/getList:
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
// #region
/**
 * @swagger
 * /shopCart/add:
 *   post:
 *     description: 加入购物车
 *     tags: [购物车模块]
 *     produces:
 *       - multipart/form-data
 *     parameters:
 *       - name: goodsId
 *         description: 商品id
 *         in: formData
 *         required: true
 *         type: number
 *       - name: listId
 *         description: list类目组合id
 *         in: formData
 *         required: false
 *         type: number
 *       - name: none_sku
 *         description: 是否为无规格商品
 *         in: formData
 *         required: true
 *         type: boolean
 *       - name: cart_num
 *         description: 选择的商品数量
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/add', shopCart.add)
module.exports = router
