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
 *       - name: phone
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
 *       - name: phone
 *         description: 手机号
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: 密码
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: 邮箱地址
 *         in: formData
 *         required: true
 *         type: string
 *       - name: code
 *         description: 邮箱验证码
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/register', user.register)
// #region
/**
 * @swagger
 * /user/getInfo:
 *   get:
 *     description: 取得用户信息
 *     tags: [用户模块]
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.get('/getInfo', user.getInfo)
// #region
/**
 * @swagger
 * /user/modify:
 *   post:
 *     description: 修改用户信息
 *     tags: [用户模块]
 *     produces:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: data
 *         description: 用户信息（传什么修改什么）
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/modify', user.modify)
// #region
/**
 * @swagger
 * /user/resetPass:
 *   post:
 *     description: 重置密码
 *     tags: [用户模块]
 *     produces:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: email
 *         description: 邮箱地址
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: 新密码
 *         in: formData
 *         required: true
 *         type: string
 *       - name: code
 *         description: 邮箱验证码
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/resetPass', user.resetPass)
// #region
/**
 * @swagger
 * /user/checkEmail:
 *   post:
 *     description: 更换绑定邮箱
 *     tags: [用户模块]
 *     produces:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: email
 *         description: 新邮箱地址
 *         in: formData
 *         required: true
 *         type: string
 *       - name: code
 *         description: 邮箱验证码
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       0:
 *         description: 成功
 */
// #endregion
router.post('/checkEmail', user.checkEmail)
module.exports = router
