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
// #region
/**
 * @swagger
 * /shopCart/delete:
 *   post:
 *     description: 删除购物车（可传单个多个,隔开）
 *     tags: [购物车模块]
 *     produces:
 *       - multipart/form-data
 *     parameters:
 *       - name: cartIds
 *         description: 购物车id
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/delete', shopCart.delete)
// #region
/**
 * @swagger
 * /shopCart/edit:
 *   post:
 *     description: 修改购物车
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
 *         description: list类目组合id 无规格商品false非必填，有规格商品必填
 *         in: formData
 *         required: false
 *         type: number
 *       - name: oldListId
 *         description: list类目组合id 无规格商品false非必填，有规格商品必填
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
router.post('/edit', shopCart.edit)
module.exports = router
