const mySqlServer = require("../mysql/index.js")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { DB_HOST, DB_PORT } = process.env
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
  const sql = [
    `select count(*) from user where userName like '%${userName}%' and phone like '%${phone}%';`,
    `select * from user where userName like '%${userName}%' and phone like '%${phone}%' limit ${(page-1)*size},${size};`,
  ]
  let result = {}
  const promise = sql.map(b => mySqlServer.mySql(b))
  let aa = await Promise.all(promise)
  aa.forEach(item => {
    if (item.length > 0 && item[0]['count(*)']) {
      result['total'] = item[0]['count(*)']
    } else {
      result['list'] = item
      result['page'] = parseInt(page)
      result['size'] = parseInt(size)
    }
  })
  ctx.success(result, '成功')
  // var result = await mySqlServer.mySql(sql)
  // if (result) {
  //     console.log('查询成功', ctx, result)
  //     ctx.success(result, '查询成功')
  // } else {
  //   ctx.fail('查询失败', -1)
  // }
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
//  if (ctx.session.captcha != captcha.toLowerCase()) {
//    ctx.fail('验证码有误', -1)
//    return
//  }
 const sql = `select * from user where phone = ${phone} and password = ${password}`
 const res = await mySqlServer.mySql(sql)
 if (res.length === 1 && phone == res[0].phone && password == res[0].password) {
   const token = jwt.sign({
     name: res[0].userName,
     id: res[0].userId
   }, 'my_token', { expiresIn: '7d' })
   ctx.success(token, '登陆成功')
 } else {
  ctx.fail('用户名或密码错误', -1)
 }
}

exports.register = async (ctx, next) => {
   /*
  注册
  userName = 账号（必填）
  password = 密码（必填）
  */
  const data = ctx.request.body
  if (!data.phone || !data.password) {
    ctx.fail('参数错误', -1)
    return
  }
  const params = [data.userName, data.password, data.sex, data.phone, data.city, data.area, data.avatar]
  const sql = `insert into user (userName,password,sex,phone,city,area,avatar) values (?,?,?,?,?,?,?)`
  const res = await mySqlServer.mySql(sql, params)
  if (res) {
    ctx.success('', '成功')
  } else {
    ctx.fail('参数错误', -1)
  }
}

exports.getInfo = async (ctx) => {
  let ids = -1
  const token = ctx.request.header.authorization.substring(7)
  if (!token || token == '') {
    ctx.fail('失败', -1)
    return
  }
  jwt.verify(token, 'my_token', (err, authData) => {
    if (!err) {
      ids = authData.id
    } else {
      ids = -1
    }
  })
  const userDetails = new Promise(async(resolve, reject) => {
    const sql = `select * from user where userId=${ids}`
    const res = await mySqlServer.mySql(sql)
    if (res && res.length > 0) {
      if (res[0].avatar != null) {
        const fileSql = `select * from file where id=${res[0].avatar}`
        mySqlServer.mySql(fileSql).then(result => {
          if (result) {
            res[0].avatar = `http://${DB_HOST}:${DB_PORT}/upload/image/${result[0].id}.${result[0].type}`
            resolve(res[0])
          }
        })
      } else {
        resolve(res[0])
      }
    } else {
      reject(-1)
    }
  })
  const res = await userDetails
  if (res != -1) {
    ctx.success(res, '成功')
  } else {
    ctx.fail('失败', -1)
  }
}
