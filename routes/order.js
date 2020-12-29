const router = require('koa-router')()

const order = require('../controller/order')
router.prefix('/order')
// #region
/**
 * @swagger
 * /order/add:
 *   post:
 *     description: 提交订单
 *     tags: [订单模块]
 *     produces:
 *       - multipart/form-data
 *     parameters:
 *       - name: addressId
 *         description: 收货地址id
 *         in: formData
 *         required: true
 *         type: number
 *       - name: desc
 *         description: 订单备注
 *         in: formData
 *         required: false
 *         type: string
 *       - name: goodsId
 *         description: 商品id
 *         in: formData
 *         required: true
 *         type: number
 *       - name: list
 *         description: list规格数据
 *         in: formData
 *         required: true
 *         type: array
 *       - name: none_sku
 *         description: 是否为无规格商品
 *         in: formData
 *         required: true
 *         type: boolean
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/add', order.add)
// #region
/**
 * @swagger
 * /order/getStatusList:
 *   post:
 *     description: 根据状态分页查询 订单状态
 *     tags: [订单模块]
 *     produces:
 *       - multipart/form-data
 *     parameters:
 *       - name: page
 *         description: 页码
 *         in: formData
 *         required: true
 *         type: number
 *       - name: szie
 *         description: 每页数量
 *         in: formData
 *         required: true
 *         type: number
 *       - name: orderStatus
 *         description: 订单状态（传空为全部订单）（DFK,DFH,DSH,DPJ）（代付款，代发货，待收货，待评价）
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/getStatusList', order.getStatusList)
// #region
/**
 * @swagger
 * /order/changeOrderStatus:
 *   post:
 *     description: 修改订单状态
 *     tags: [订单模块]
 *     produces:
 *       - multipart/form-data
 *     parameters:
 *       - name: id
 *         description: 订单id
 *         in: formData
 *         required: true
 *         type: number
 *       - name: szie
 *         description: 订单状态（DFK,DFH,DSH,DPJ）（代付款，代发货，待收货，待评价）
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/changeOrderStatus', order.changeOrderStatus)
// #region
/**
 * @swagger
 * /order/deleteOrder:
 *   post:
 *     description: 删除订单
 *     tags: [订单模块]
 *     produces:
 *       - multipart/form-data
 *     parameters:
 *       - name: id
 *         description: 订单id
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/deleteOrder', order.deleteOrder)
// #region
/**
 * @swagger
 * /order/details:
 *   post:
 *     description: 查询订单详情
 *     tags: [订单模块]
 *     produces:
 *       - multipart/form-data
 *     parameters:
 *       - name: id
 *         description: 订单id
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/details', order.details)
module.exports = router
