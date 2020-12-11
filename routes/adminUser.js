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
 *         type: string
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/getDetails', adminUser.getDetails)
module.exports = router
