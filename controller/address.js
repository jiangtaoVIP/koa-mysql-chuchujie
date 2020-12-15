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
      ctx.success({id: res.insertId}, '成功')
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
    const sql = `select * from shop_address where parentId=${ids} order by createTime desc`
    const res = await mySqlServer.mySql(sql)
    if (res.length > 0) {
      res.forEach(item => {
        item['isDefault'] = item.isDefault != 0
      })
    }
    ctx.success(res, '成功')
  } else {
    ctx.fail('失败', -1)
  }
  
}
exports.defaultAddress = async(ctx) => {
  // 设置默认地址
  const data = ctx.request.body
  if (!data.id || data.isDefault == undefined) {
    ctx.fail('参数错误', -1)
    return
  }
  const token = ctx.request.header.authorization.substring(7)
  const isDefault = data.isDefault ? 1 : 0
  let parentId = null // 用户id
  jwt.verify(token, 'my_token', (err, authData) => {
    if (!err) {
      parentId = authData.id
    } else {
      parentId = -1
    }
  })
  // 用户id
  if (!parentId || parentId == -1) {
    ctx.fail('参数错误', -1)
    return
  }
  const getList = new Promise(async (resolve, reject) => {
    // 先列出该用户 的所有地址列表
    const sql = `select * from shop_address where parentId=${parentId}`
    const res = await mySqlServer.mySql(sql)
    if (res && res.length > 0) {
      res.forEach(item => {
        // 判断其中是否有默认地址
        if (item.isDefault == 1 && data.isDefault == 1) {
          // 有的话修改为 否
          const mySql = `update shop_address set isDefault=0 where id=${item.id}`
          mySqlServer.mySql(mySql).then(res => {
            if (res) {
              // 修改默认地址状态
              const onSql = `update shop_address set isDefault=${isDefault} where id=${data.id}`
              mySqlServer.mySql(onSql).then(res => {
                if (res) {
                  resolve(res)
                }
              })
            }
          }).catch(err => {
            reject(err)
          })
        } else {
          // 修改默认地址状态
          const onSql = `update shop_address set isDefault=${isDefault} where id=${data.id}`
          mySqlServer.mySql(onSql).then(res => {
            if (res) {
              resolve(res)
            }
          })
        }
      })
    } else {
      resolve()
    }
  })
  const res = await getList
  if (res) {
    ctx.success('', '成功')
  } else {
    ctx.fail('失败', -1)
  }
}

exports.getDetails = async (ctx) => {
  // 查询地址详情
  const data = ctx.request.body
  if (!data.id) {
    ctx.fail('参数错误', -1)
    return
  }
  const sql = `select * from shop_address where id=${data.id}`
  const res = await mySqlServer.mySql(sql)
  if (res && res.length > 0) {
    res[0]['isDefault'] = res[0].isDefault != 0
    ctx.success(res[0], '成功')
  } else {
    ctx.fail('失败', -1)
  }
}
