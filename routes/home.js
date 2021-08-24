const router = require('koa-router')()

const home = require('../controller/home')
router.prefix('/home')
// #region
/**
 * @swagger
 * /home/getData:
 *   get:
 *     description: 首页数据
 *     tags: [首页模块]
 *     produces:
 *       - multipart/form-data
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.get('/getData', home.getData)
// #region
/**
 * @swagger
 * /home/goodsList:
 *   post:
 *     description: 首页商品底部列表数据
 *     tags: [首页模块]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         description: 页数
 *         in: formData
 *         required: true
 *         type: number
  *       - name: page
 *         description: 页码
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/goodsList', home.goodsList)
module.exports = router
