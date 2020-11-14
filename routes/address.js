const router = require('koa-router')()
const address = require('../controller/address')
router.prefix('/address')
// #region
/**
 * @swagger
 * /address/add:
 *   post:
 *     description: 增加用户地址
 *     tags: [地址模块]
 *     produces:
 *        - application/json
 *     parameters:
 *       - name: userId
 *         description: 用户id
 *         in: formData
 *         required: true
 *         type: string
 *       - name: name
 *         description: 联系人名称
 *         in: formData
 *         required: true
 *         type: string
 *       - name: phone
 *         description: 联系人电话
 *         in: formData
 *         required: true
 *         type: string
 *       - name: province
 *         description: 联系人省份
 *         in: formData
 *         required: true
 *         type: string
 *       - name: city
 *         description: 联系人城市
 *         in: formData
 *         required: true
 *         type: string
 *       - name: county
 *         description: 联系人区域
 *         in: formData
 *         required: true
 *         type: string
 *       - name: addressDetail
 *         description: 联系人详细地址
 *         in: formData
 *         required: true
 *         type: string
 *       - name: areaCode
 *         description: 联系人邮政编码
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/add', address.add)
// #region
/**
 * @swagger
 * /address/edit:
 *   post:
 *     description: 修改用户地址
 *     tags: [地址模块]
 *     produces:
 *        - application/json
 *     parameters:
 *       - name: id
 *         description: 地址id
 *         in: formData
 *         required: true
 *         type: string
 *       - name: name
 *         description: 联系人名称
 *         in: formData
 *         required: true
 *         type: string
 *       - name: phone
 *         description: 联系人电话
 *         in: formData
 *         required: true
 *         type: string
 *       - name: province
 *         description: 联系人省份
 *         in: formData
 *         required: true
 *         type: string
 *       - name: city
 *         description: 联系人城市
 *         in: formData
 *         required: true
 *         type: string
 *       - name: county
 *         description: 联系人区域
 *         in: formData
 *         required: true
 *         type: string
 *       - name: addressDetail
 *         description: 联系人详细地址
 *         in: formData
 *         required: true
 *         type: string
 *       - name: areaCode
 *         description: 联系人邮政编码
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/edit', address.edit)
// #region
/**
 * @swagger
 * /address/delete:
 *   post:
 *     description: 删除用户地址
 *     tags: [地址模块]
 *     produces:
 *        - application/json
 *     parameters:
 *       - name: id
 *         description: 地址id
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/delete', address.delete)
// #region
/**
 * @swagger
 * /address/getList:
 *   get:
 *     description: 获取用户地址列表
 *     tags: [地址模块]
 *     produces:
 *        - application/json
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.get('/getList', address.getList)
module.exports = router
