const router = require('koa-router')()
const adminUser = require('../controller/adminUser')
router.prefix('/adminUser')
// #region
/**
 * @swagger
 * /adminUser/getDetails:
 *   post:
 *     description: 查询店铺详情
 *     tags: [店铺模块]
 *     produces:
 *        - application/json
 *     parameters:
 *       - name: adminId
 *         description: 店铺id
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/getDetails', adminUser.getDetails)
// #region
/**
 * @swagger
 * /adminUser/getList:
 *   post:
 *     description: 查询店铺的商品列表
 *     tags: [店铺模块]
 *     produces:
 *        - application/json
 *     parameters:
 *       - name: adminId
 *         description: 店铺id
 *         in: formData
 *         required: true
 *         type: number
 *       - name: page
 *         description: 页码
 *         in: formData
 *         required: true
 *         type: number
 *       - name: size
 *         description: 每页的数量
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/getList', adminUser.getList)
module.exports = router
