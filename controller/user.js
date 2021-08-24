const model = require('../models/model')
const { Op } = require("sequelize")

const jwt = require('jsonwebtoken')
const { getFile } = require('../models/getfile')
const { encrypt, decrypt } = require('../models/crypt')

const EmailConfig = require('../config/email')
const Redis = require('koa-redis')
//新建连接redis客户端
const Store = Redis({ host: EmailConfig.redis.host, port: EmailConfig.redis.port }).client

require('dotenv').config() // 环境变量

const User = model.shopUser.ShopUser //获取User模型
const ShopOrder = model.shopOrder.ShopOrder
const MyGoodsListRate = model.goodsdetailsRate.MyGoodsListRate

exports.getList = async (ctx, next) => {
  /*
  获取用户列表
  page = 页码（必填）
  size = 页数（必填）
  phone = 电话号码（选填）
  userName = 用户名（选填）
  */
  const query = ctx.request.query
  const page = query.page
  const size = query.size
  const phone = query.phone ? query.phone : ''
  const userName = query.userName ? query.userName : ''
  if (!page || !size) {
    ctx.fail('参数错误', -1)
    return
  }
  const res = await User.findAndCountAll({
    order: [['updateTime', 'DESC']],
    where: {
      phone: {
        [Op.like]: `%${phone}%`
      },
      userName: {
        [Op.like]: `%${userName}%`
      }
    },
    offset: (page-1) * size,
    limit: parseInt(size)
  })
  if (res) {
    ctx.success({
      total: res.count, // 总页数
      pageNum: Math.trunc((res.count + (size -1) )/size), // 分页数量
      page: parseInt(page), // 页码
      size: parseInt(size), // 页数
      list: res.rows
    })
  }
}
exports.login = async (ctx, next) => {
  /*
  登陆
  userName = 账号（必填）
  password = 密码（必填）
  captcha = 验证码（必填）
  */
 const { phone, password, captcha } = ctx.request.body
 if (!phone || !password) {
  ctx.fail('参数错误', -1)
  return
 }
 console.log(ctx.session.captcha, '验证码')
 if (process.env.ENV != 'development' && ctx.session.captcha != captcha.toLowerCase()) {
  ctx.fail('验证码有误', -1)
  return
 }
  function allFn() {
    return new Promise(async(resolve) => {
      // 第一步先查找是否有该用户
      const res = await User.findOne({ where: { phone: { [Op.eq]: phone }}})
      console.log(res)
      if (res !== undefined && res) { // 有该用户
        const pwd = res.password

        if (decrypt(password, pwd)) { // 密码验证 通过
          // 生成token
          const token = jwt.sign({
            userName: res.userName,
            id: res.userId,
            phone: res.phone
          }, 'user_token', { expiresIn: process.env.ENV != 'development' ? '7h' : '365d' }) // 线下环境365天
          resolve({
            code: 0,
            data: token
          })
        } else {  // 密码验证 不通过
          resolve({
            code: -1,
            msg: '登陆失败，密码错误，请重试'
          })
        }
      } else {
        resolve({
          code: -1,
          msg: '没有该用户！请注册'
        })
      }
    })
  }
  const res = await allFn()
  if (res.code === 0) {
    ctx.success(res.data, '登陆成功')
  } else {
    ctx.fail(res.msg, -1)
  }
}

exports.register = async (ctx, next) => {
   /*
  注册
  userName = 账号（必填）
  password = 密码（必填）
  */
  const { phone, password, email, code } = ctx.request.body
  if (!phone || !password || !email || !code) {
    ctx.fail('参数错误', -1)
    return
  }
  function registerFn() {
    return new Promise(async(resolve) => {
      const saveCode = await Store.hget(`nodemail:${email}`, 'code')
      const saveExpire = await Store.hget(`nodemail:${email}`, 'expire')
      if (saveCode && saveExpire) { // 验证码和时间都有存储到的时候
        if (code.toUpperCase() ==  saveCode) { // 验证码相同的时候
          if (new Date().getTime() - saveExpire > 0) { // 验证码是否过期
            resolve('验证码已过期，请重新尝试')
          } else { // 最终创建账号
            const res = await User.create({ 
              phone: phone,
              password: password,
              email: email
            })
            if (res) {
              resolve(0)
            } else {
              resolve('注册失败！服务器出错！')
            }
          }
        } else {
          resolve('请填写正确的验证码')
        }
      } else {
        resolve('验证码错误')
      }
    })
  }
  function allFn() {
    return new Promise(async(resolve) => {
      const findEmail = await User.findAll({ 
        where: { [Op.or]: [{ phone: phone }, { email: email }],   }
      }) // (a = 5) OR (b = 6)
      if (findEmail.length > 0) {
        resolve('该手机号/邮箱已被注册！')
      } else {
        registerFn().then((data) => {
          resolve(data)
        })
      }
    })
  }
  const res = await allFn()
  if (res == 0) {
    ctx.success('', '注册成功')
    // 注册成功清楚
    Store.hmset(`nodemail:${email}`, 'code', '')
    Store.hmset(`nodemail:${email}`, 'expire', '')
    Store.hmset(`nodemail:${email}`, 'email', '')
  } else {
    ctx.fail(res, -1)
  }
}

exports.getInfo = async (ctx) => {
  const { getFile } = require('../models/getfile')
  const { verify } = require('../models/tokenFn')
  const userId = verify(ctx.header)
  let body = {}
  // 订单状态数据同级
  function orderNumFn() {
    return new Promise(async(resolve) => {
      const DFK = await ShopOrder.findAndCountAll({ where: { userId: userId, orderStatus: 'DFK' }})
      const DFH = await ShopOrder.findAndCountAll({ where: { userId: userId, orderStatus: 'DFH' }})
      const DSH = await ShopOrder.findAndCountAll({ where: { userId: userId, orderStatus: 'DSH' }})
      const DPJ = await ShopOrder.findAndCountAll({ where: { userId: userId, orderStatus: 'DPJ' }})
      if (DFK && DFH && DSH && DPJ) {
        let data = {
          DFK: DFK.count,
          DFH: DFH.count,
          DSH: DSH.count,
          DPJ: DPJ.count,
        }
        resolve(data)
      }
    })
  }
  function allFn() {
    return new Promise(async(resolve) => {
      let user_res = await User.findOne({ where: { userId: userId }})
      if (user_res) {
        const promisr_all = await Promise.all([orderNumFn(), getFile(user_res.avatar)])
        if (promisr_all && promisr_all.length >= 2) {
          user_res['avatar'] = promisr_all[1]
          user_res = Object.assign(user_res, promisr_all[0])
          body = user_res
          resolve(body)
        }
      }
    })
  }
  const res = await allFn()
  if (res !== -1) {
    ctx.success(res)
  } else {
    ctx.fail('失败')
  }
}
exports.modify = async(ctx) => {
  const { verify } = require('../models/tokenFn')
  const data = ctx.request.body
  const userId = verify(ctx.header)
  if (!data) {
    ctx.fail('参数错误')
    return
  }
  if (data.password || data.phone || data.email) {
    ctx.fail('包含敏感信息，修改失败')
    return
  }
  function allFn() {
    return new Promise(async(resolve) => {
      for (let fag in data) {
        if (data[fag] == null || data[fag] == undefined || data[fag] == '') {
          delete data[fag]
        }
      }
      const res = await User.update(data, {
        where: {
          userId: userId
        }
      })
      if (res[0] == 1) {
        resolve('修改成功')
      } else {
        resolve(-1)
      }
    })
  }
  const res = await allFn()
  if (res !== -1) {
    ctx.success('', res)
  } else {
    ctx.fail('修改失败')
  }
}

exports.resetPass = async(ctx) => {
  const { email, code, password } = ctx.request.body
  if (!email || !code || !password) {
    ctx.fail('参数错误', -1)
    return
  }
  function resetPass() {
    return new Promise(async(resolve) => {
      const saveCode = await Store.hget(`nodemail:${email}`, 'code')
      const saveExpire = await Store.hget(`nodemail:${email}`, 'expire')
      if (saveCode && saveExpire) {
        if (code.toUpperCase() ==  saveCode) { // 验证码是否一致
          if (new Date().getTime() - saveExpire > 0) { // 是否过期
            resolve('验证码已过期，请重新尝试')
          } else { // 最终修改
            const res = await User.update({ password: password }, {
              where: { email: email }
            })
            console.log(res, 'ressss')
            if (res[0] == 1) {
              resolve(0)
            } else {
              resolve('失败！服务器出错！')
            }
          }
        } else {
          resolve('请填写正确的验证码')
        }
      } else {
        resolve('验证码错误')
      }
    })
  }
  function allFn() {
    return new Promise(async(resolve) => {
      // 第一步先查找是否有该用户
      const user_res = await User.findOne({ where: { email: { [Op.eq]: email }}})
      if (user_res) { // 有该账号，进行下一步
        const reset_res = await resetPass()
        console.log(reset_res, 'reset_res')
        resolve(reset_res)
      } else {
        resolve('该账号未注册！')
      }
    })
  }
  const res = await allFn()
  if (res === 0) {
    ctx.success('', '成功')
    // 注册成功清楚code
    Store.hmset(`nodemail:${email}`, 'code', '')
    Store.hmset(`nodemail:${email}`, 'expire', '')
    Store.hmset(`nodemail:${email}`, 'email', '')
  } else {
    ctx.fail(res, -1)
  }
}

exports.checkEmail = async(ctx) => {
  const { verify } = require('../models/tokenFn')
  const userId = verify(ctx.header)
  const { email, code, newEmail } = ctx.request.body
  if (!email || !code || !userId || !newEmail) {
    ctx.fail('参数错误', -1)
    return
  }
  function modifyEmail() {
    return new Promise (async(resolve) => {
      const isRepeat_res = await User.findOne({ where: { email: newEmail }})
      console.log(isRepeat_res, 'isRepeat_res')
      if (!isRepeat_res) { // 未被注册
        const res = await User.update({ email: newEmail }, {
          where: {
            userId: userId
          }
        })
        if (res[0] === 1) {
          resolve(0)
        } else {
          resolve('修改失败，服务器出错！')
        }
      } else {
        resolve('该邮箱已被注册！')
      }
    })
  }
  function allFn() {
    return new Promise(async(resolve) => {
      const saveCode = await Store.hget(`nodemail:${email}`, 'code')
      const saveExpire = await Store.hget(`nodemail:${email}`, 'expire')
      console.log(saveCode, new Date().getTime() - saveExpire, 'saveCode')
      if (saveCode && saveExpire) {
        if (code.toUpperCase() ==  saveCode) {
          if (new Date().getTime() - saveExpire > 0) {
            resolve('验证码已过期，请重新尝试')
          } else {
            modifyEmail().then(data => {
              resolve(data)
            })
          }
        } else {
          resolve('请填写正确的验证码')
        }
      } else {
        resolve('验证码错误')
      }
    })
  }
  const res = await allFn()
  if (res === 0) {
    ctx.success('', '成功')
    // 成功清楚code
    Store.hmset(`nodemail:${email}`, 'code', '')
    Store.hmset(`nodemail:${email}`, 'expire', '')
    Store.hmset(`nodemail:${email}`, 'email', '')
  } else {
    ctx.fail(res, -1)
  }
}
