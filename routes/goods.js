const router = require('koa-router')()
const goods = require('../controller/goods')
router.prefix('/goods')
// #region
/**
 * @swagger
 * /goods/categoryOne:
 *   get:
 *     description: 获取商品一级分类
 *     tags: [商品模块]
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.get('/categoryOne', goods.categoryOne)
// #region
/**
 * @swagger
 * /goods/categoryTwo:
 *   post:
 *     description: 获取商品二级分类
 *     tags: [商品模块]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: 一级分类的id
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/categoryTwo', goods.categoryTwo)
// #region
/**
 * @swagger
 * /goods/getGoodsList:
 *   post:
 *     description: 根据二级分类获取商品列表
 *     tags: [商品模块]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: 二级分类的id
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/getGoodsList', goods.getGoodsList)
// #region
/**
 * @swagger
 * /goods/goodDetails:
 *   post:
 *     description: 根据商品id 获取详情
 *     tags: [商品模块]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: 商品的id
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/goodDetails', goods.goodDetails)
// #region
/**
 * @swagger
 * /goods/searchGoodsList:
 *   post:
 *     description: 搜索商品
 *     tags: [商品模块]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: 商品搜索关键词（精确搜索空格隔开）
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/searchGoodsList', goods.searchGoodsList)
module.exports = router
