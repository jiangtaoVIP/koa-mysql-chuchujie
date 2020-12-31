const mySqlServer = require("../mysql/index.js")
const jwt = require('jsonwebtoken')
const { getFile } = require('../model/getfile')
const { encrypt, decrypt } = require('../model/crypt')

const EmailConfig = require('../config/email')
const Redis = require('koa-redis')
//新建redis客户端
const Store = Redis({ host: EmailConfig.redis.host, port: EmailConfig.redis.port }).client

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
    `select count(*) from shop_user where userName like '%${userName}%' and phone like '%${phone}%';`,
    `select * from shop_user where userName like '%${userName}%' and phone like '%${phone}%' limit ${(page-1)*size},${size};`,
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
 const sql = `select * from shop_user where phone = '${phone}' or email = '${phone}'`
 const res = await mySqlServer.mySql(sql)
 // 密码效验
 if (res.length == 1 && decrypt(password, res[0].password)) {
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
  if (!data.phone || !data.password || !data.email || !data.code) {
    ctx.fail('参数错误', -1)
    return
  }

  function registerFn() {
    return new Promise(async(resolve) => {
    const params = [data.phone, encrypt(data.password), data.email]
    const sql = `insert into shop_user (phone,password,email) values (?,?,?)`
    const res = await mySqlServer.mySql(sql, params)
    console.log('执行了添加用户', res)
    if (res) {
      resolve('成功')
    } else {
      resolve(-1)
    }
  })
  }

  const allFn = new Promise(async(resolve) => {
    const saveCode = await Store.hget(`nodemail:${data.email}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${data.email}`, 'expire')
    if (saveCode && saveExpire) {
      if (data.code.toUpperCase() ==  saveCode) {
        if (new Date().getTime() - saveExpire > 0) {
          resolve('验证码已过期，请重新尝试')
        } else {
          const sql = `select * from shop_user where phone = '${data.phone}' or email = '${data.email}'`
          mySqlServer.mySql(sql).then(res => {
            console.log(res, '注册')
            if (res.length === 0) {
              registerFn().then(register_res => {
                if (register_res != -1) {
                  resolve(0)
                } else {
                  resolve('注册失败')
                }
              })
            } else {
              resolve('该手机号/邮箱已被注册！')
            }
          })
        }
      } else {
        resolve('请填写正确的验证码')
      }
    } else {
      resolve('注册失败')
    }
  })

  const res = await allFn
  if (res == 0) {
    ctx.success('', '注册成功')
    // 注册成功清楚code
    Store.hmset(`nodemail:${data.email}`, 'code', '')
  } else {
    ctx.fail(res, -1)
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
  let body = {} // 用户数据
  function avatarFn(avatarId) {
    return new Promise(async(resolve) => {
      if (avatarId !== null && avatarId) {
        const res = await getFile(avatarId)
        if (res) {
          body['avatar'] = res
          resolve(res)
        }
      } else {
        resolve()
      }
    })
  }
  const orderNumFn = new Promise(async(resolve) => {
    const DFK = await mySqlServer.mySql(`select count(*) from shop_order where userId = ${ids} and orderStatus = 'DFK'`)
    const DFH = await mySqlServer.mySql(`select count(*) from shop_order where userId = ${ids} and orderStatus = 'DFH'`)
    const DSH = await mySqlServer.mySql(`select count(*) from shop_order where userId = ${ids} and orderStatus = 'DSH'`)
    const DPJ = await mySqlServer.mySql(`select count(*) from shop_order where userId = ${ids} and orderStatus = 'DPJ'`)
    if (DFK.length > 0 && DFH.length > 0 && DSH.length > 0 && DPJ.length > 0) {
      body['DFK'] = DFK[0]['count(*)']
      body['DFH'] = DFH[0]['count(*)']
      body['DSH'] = DSH[0]['count(*)']
      body['DPJ'] = DPJ[0]['count(*)']
      mySqlServer.mySql(`select count(*) from shopcart where userId = ${ids}`).then(num => {
        if (num.length > 0) {
          body['shopCartNum'] = num[0]['count(*)']
          resolve()
        } else {
          resolve()
        }
      })
    } else {
      resolve()
    }
  })
  const userDetails = new Promise(async(resolve, reject) => {
    const sql = `select * from shop_user where userId=${ids}`
    const res = await mySqlServer.mySql(sql)
    if (res && res.length > 0) {
      body = res[0]
      const all_res = await Promise.all([avatarFn(res[0].avatar), orderNumFn])
      if (all_res.length > 0) {
        resolve(0)
      } else {
        resolve(0)
      }
    } else {
      reject(-1)
    }
  })
  const res = await userDetails
  if (res != -1) {
    ctx.success(body, '成功')
  } else {
    ctx.fail('失败', -1)
  }
}
exports.modify = async(ctx) => {
  // 组装数据
  const data = ctx.request.body
  const body = {
    userName: data.userName != undefined ? data.userName : null,
    phone: data.phone != undefined  ? data.phone : null,
    sex: data.sex != undefined  ? data.sex : null,
    birthday: data.birthday != undefined  ? data.birthday : null,
    descText: data.descText != undefined  ? data.descText : null,
    password: data.password != undefined  ? data.password : null,
  }
  let mySqlString = []
  for (const prop in body) {
    if (body[prop] === null) {
      delete body[prop]
    }
  }
  for(const prop in body) {
    mySqlString.push(`${prop}='${body[prop]}'`)
  }
  mySqlString = mySqlString.join(',')
  // end
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
  console.log(mySqlString, 'mySqlString')
  const sql = `update shop_user set ${mySqlString} where userId = ${ids}`
  const res = await mySqlServer.mySql(sql)
  if (res) {
    ctx.success('', '成功')
  } else {
    ctx.fail('失败', -1)
  }
}

exports.resetPass = async(ctx) => {
  const { email, code, password } = ctx.request.body
  if (!email || !code || !password) {
    ctx.fail('参数错误', -1)
    return
  }
  function modifyUser() {
    return new Promise (async(resolve) => {
      const isRepeat_res = await mySqlServer.mySql(`select * from shop_user where email='${email}'`)
      if (isRepeat_res.length === 0) {
        resolve('该账号未注册！')
      } else {
        const sql = `update shop_user set password='${encrypt(password)}' where email = '${email}'`
        const res = await mySqlServer.mySql(sql)
        if (res) {
          resolve(0)
        } else {
          resolve('失败')
        }
      }
    })
  }
  const allFn = new Promise(async(resolve) => {
    const saveCode = await Store.hget(`nodemail:${email}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${email}`, 'expire')
    if (saveCode && saveExpire) {
      if (code.toUpperCase() ==  saveCode) {
        if (new Date().getTime() - saveExpire > 0) {
          resolve('验证码已过期，请重新尝试')
        } else {
          modifyUser().then(data => {
            resolve(data)
          })
        }
      } else {
        resolve('请填写正确的验证码')
      }
    }
  })
  const res = await allFn
  if (res === 0) {
    ctx.success('', '成功')
    // 注册成功清楚code
    Store.hmset(`nodemail:${email}`, 'code', '')
  } else {
    ctx.fail(res, -1)
  }
}

exports.checkEmail = async(ctx) => {
  const { email, code, userId } = ctx.request.body
  console.log(email, code, userId)
  if (!email || !code || !userId) {
    ctx.fail('参数错误', -1)
    return
  }
  function modifyEmail() {
    return new Promise (async(resolve) => {
      const isRepeat_res = await mySqlServer.mySql(`select * from shop_user where email='${email}'`)
      if (isRepeat_res.length === 0) {
        const sql = `update shop_user set email='${email}' where userId = '${userId}'`
        const res = await mySqlServer.mySql(sql)
        if (res) {
          resolve(0)
        } else {
          resolve('失败')
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
      }
    })
  }
  const res = await allFn()
  if (res === 0) {
    ctx.success('', '成功')
    // 成功清楚code
    Store.hmset(`nodemail:${email}`, 'code', '')
  } else {
    ctx.fail(res, -1)
  }
}
