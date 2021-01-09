const router = require('koa-router')()
const comment = require('../controller/comment')
router.prefix('/comment')
// #region
/**
 * @swagger
 * /comment/getStatusList:
 *   post:
 *     description: 根据状态获取商品的评论列表
 *     tags: [评论模块]
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/getStatusList', comment.getStatusList)
module.exports = router
