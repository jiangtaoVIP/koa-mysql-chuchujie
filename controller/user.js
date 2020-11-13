const mySqlServer = require("../mysql/index.js")
const jwt = require('jsonwebtoken')
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
 const { userName, password, captcha } = ctx.request.body
 if (!userName || !password) {
  ctx.fail('参数错误', -1)
  return
 }
 console.log(ctx.session.captcha, '验证码')
 if (ctx.session.captcha != captcha.toLowerCase()) {
   ctx.fail('验证码有误', -1)
   return
 }
 const sql = `select * from user where userName = ${userName} and password = ${password}`
 const res = await mySqlServer.mySql(sql)
 if (res.length === 1 && userName == res[0].userName && password == res[0].password) {
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
  if (!data.userName || !data.password) {
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

