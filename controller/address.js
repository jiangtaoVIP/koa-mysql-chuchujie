const mySqlServer = require("../mysql/index.js")
const jwt = require('jsonwebtoken')
exports.add = async (ctx, next) => {
    /*
    增加用户的收货地址
    userId 必填
    name
    phone
    province
    city
    county
    addressDetail
    areaCode
    */
    const data = ctx.request.body
    if (!data.userId) {
      ctx.fail('参数错误', -1)
      return
    }
    const params = [
      data.userId, data.name, data.phone, data.province, data.city, data.county,
      data.addressDetail, data.areaCode
    ]
    const sql = `insert into shop_address (parentId,name,phone,province,city,county,addressDetail,areaCode) values (?,?,?,?,?,?,?,?)`
    const res = await mySqlServer.mySql(sql, params)
    if (res) {
      ctx.success('', '成功')
    } else {
      ctx.fail('失败', -1)
    }
}
exports.edit = async (ctx, next) => {
  /*
    修改用户的收货地址
    userId 必填
    name
    phone
    province
    city
    county
    addressDetail
    areaCode
  */
    const data = ctx.request.body
    if (!data.id) {
      ctx.fail('参数错误', -1)
      return
    }
    const params = [
      data.name, data.phone, data.province, data.city, data.county,
      data.addressDetail, data.areaCode, data.id,
    ]
    const sql = `update shop_address set name=?,phone=?,province=?,city=?,county=?,addressDetail=?,areaCode=? where id = ?`
    const res = await mySqlServer.mySql(sql, params)
    if (res) {
      ctx.success('', '成功')
    } else {
      ctx.fail('失败', -1)
    }
}
exports.delete = async (ctx) => {
  /*
    删除用户的收货地址
    id 必填
  */
  const data = ctx.request.body
  if (!data.id) {
    ctx.fail('参数错误', -1)
    return
  }
  const sql = `delete from shop_address where id=${data.id}`
  const res = await mySqlServer.mySql(sql)
  console.log(res)
  if (res) {
    if (res) {
      ctx.success('', '成功')
    } else {
      ctx.fail('失败', -1)
    }
  }
}
exports.getList = async (ctx, next) => {
  /*
    获取用户的收货地址列表
    token 获取
  */
 const token = ctx.request.header.authorization.substring(7)
 let ids = ''
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
  if (ids != -1 && ids != '') {
    const sql = `select * from shop_address where parentId=${ids}`
    const res = await mySqlServer.mySql(sql)
    ctx.success(res, '成功')
  } else {
    ctx.fail('失败', -1)
  }
  
}