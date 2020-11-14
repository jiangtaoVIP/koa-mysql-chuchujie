const router = require('koa-router')()

const upload = require('../controller/upload')
router.prefix('/upload')
// #region
/**
 * @swagger
 * /upload/image:
 *   post:
 *     description: 上传图片
 *     tags: [文件模块]
 *     produces:
 *       - multipart/form-data
 *     parameters:
 *       - name: file
 *         description: 字段名
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/image', upload.image)

module.exports = router
