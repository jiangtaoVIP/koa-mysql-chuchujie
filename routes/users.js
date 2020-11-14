const router = require('koa-router')()
// const mySqlServer = require("../mysql/index.js")
const user = require('../controller/user')
router.prefix('/user')
// #region
/**
 * @swagger
 * /user/getList:
 *   get:
 *     description: 获取用户列表
 *     tags: [用户模块]
 *     parameters:
 *       - name: page
 *         description: 页码
 *         in: formData
 *         required: true
 *         type: string
 *       - name: size
 *         description: 页数
 *         in: formData
 *         required: true
 *         type: string
 *       - name: phone
 *         description: 电话号码
 *         in: formData
 *         required: false
 *         type: string
 *       - name: userName
 *         description: 用户名
 *         in: formData
 *         required: false
 *         type: string
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.get('/getList', user.getList)
// #region
/**
 * @swagger
 * /user/login:
 *   post:
 *     description: 用户登陆
 *     tags: [用户模块]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userName
 *         description: 账号
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: 密码
 *         in: formData
 *         required: true
 *         type: string
 *       - name: captcha
 *         description: 验证码
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/login', user.login)
// #region
/**
 * @swagger
 * /user/register:
 *   post:
 *     description: 用户注册
 *     tags: [用户模块]
 *     produces:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: userName
 *         description: 账号
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: 密码
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/register', user.register)
module.exports = router
