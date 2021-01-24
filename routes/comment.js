const router = require('koa-router')()
const comment = require('../controller/comment')
router.prefix('/comment')
// #region
/**
 * @swagger
 * /comment/getStatusList:
 *   post:
 *     description: 获取商品评论列表
 *     tags: [评论模块]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         description: 页码
 *         in: formData
 *         required: true
 *         type: string
 *       - name: size
 *         description: 每页的数量
 *         in: formData
 *         required: true
 *         type: string
 *       - name: status
 *         description: 状态（'',全部。newest，最新。own,自己）
 *         in: formData
 *         required: true
 *         type: string
 *       - name: goodsId
 *         description: 商品id
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/getStatusList', comment.getStatusList)
module.exports = router
