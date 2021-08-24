const router = require('koa-router')()
const emailVerify = require('../controller/emailVerify')
router.prefix('/emailVerify')
// #region
/**
 * @swagger
 * /emailVerify 获取邮箱验证码（2分钟内有效）:
 *   post:
 *     description: 获取邮箱验证码（2分钟内有效）
 *     tags: [验证模块]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: 邮箱地址
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/', emailVerify.getEmailVerify)
module.exports = router
