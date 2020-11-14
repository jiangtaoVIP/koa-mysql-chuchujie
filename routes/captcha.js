const router = require('koa-router')()
const captcha = require('../controller/captcha')
router.prefix('/captcha')
// #region
/**
 * @swagger
 * /captcha:
 *   post:
 *     description: 获取验证码图片
 *     tags: [验证模块]
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/', captcha.verification)
module.exports = router
