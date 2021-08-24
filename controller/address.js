const mySqlServer = require("../mysql/index.js")
const jwt = require('../models/tokenFn')
const model = require('../models/model')
const ShopAdderess = model.shopAddress.ShopAdderess

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
    const userId = jwt.verify(ctx.header)
    const data = ctx.request.body
    if (!userId) {
      ctx.fail('参数错误', -1)
      return
    }
    let res
    if (data.id) { // 如果有id 为修改
      res = await ShopAdderess.update({ ...data, parentId: userId }, {
        where: { id: data.id }
      })
    } else {
      res = await ShopAdderess.create({ ...data, parentId: userId })
    }
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
    const userId = jwt.verify(ctx.header)
    const data = ctx.request.body
    if (!userId || !data.id) {
      ctx.fail('参数错误', -1)
      return
    }
    const res = await ShopAdderess.update(data, {
      where: { id: data.id }
    })
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
  const userId = jwt.verify(ctx.header)
  if (!userId) {
    ctx.fail('参数错误', -1)
    return
  }
  const res = await ShopAdderess.findAll({
    order: [['updateTime', 'DESC']],
    where: { parentId: userId }
  })
  if (res) {
    res.forEach(item => item.isDefault = item.isDefault != 0)
    ctx.success(res, '成功')
  } else {
    ctx.fail('失败', -1)
  }
}

exports.defaultAddress = async(ctx) => {
  // 设置默认地址
  const userId = jwt.verify(ctx.header)
  if (!userId) {
    ctx.fail('参数错误', -1)
    return
  }
  const { id, isDefault } = ctx.request.body
  if (!id || isDefault == undefined) {
    ctx.fail('参数错误', -1)
    return
  }
  // 更新默认收货地址值
  function update(id, isDefault) {
    return new Promise(async(resolve) => {
      const res = await ShopAdderess.update({ isDefault: isDefault }, { where: { id: id }})
      if (res[0] === 1) {
        resolve('成功')
      } else {
        resolve(-1)
      }
    })
  }
  // 要true时触发 把其他的改成flase 再把传入来的值进行修改
  function modifyDefault() {
    return new Promise(async(resolve) => {
      // 先列出该用户 的所有地址列表
      const addRess_res = await ShopAdderess.findAll({ where: { parentId: userId }})
      if (addRess_res && addRess_res.length > 0) {
        const index = addRess_res.findIndex(item => item.isDefault == 1) // 找出默认地址索引
        console.log(index, addRess_res)
        if (index !== -1) { // 找到了有设置默认地址
          const modifyDefault_res = await update(addRess_res[index].id, false) // 修改为false
          if (modifyDefault_res) {
            update(id, isDefault).then(res => {
              resolve(res)
            })
          }
        } else { // 没有找到就直接修改
          update(id, isDefault).then(res => {
            resolve(res)
          })
        }
      } else {
        resolve()
      }
    })
  }
  function allFn() {
    return new Promise(async(resolve) => {
      if (!isDefault) { // 判断是false还是true（false直接修改）
        const res = await update(id, isDefault)
        resolve(res)
      } else { // 如果传过来是true，就要把其他的都设置为false
        const  res = await modifyDefault()
        resolve(res)
      }
    })
  }
  // const getList = new Promise(async (resolve, reject) => {
  //   // 先列出该用户 的所有地址列表
  //   const sql = `select * from shop_address where parentId=${parentId}`
  //   const res = await mySqlServer.mySql(sql)
  //   if (res && res.length > 0) {
  //     res.forEach(item => {
  //       // 判断其中是否有默认地址
  //       if (item.isDefault == 1 && data.isDefault == 1) {
  //         // 有的话修改为 否
  //         const mySql = `update shop_address set isDefault=0 where id=${item.id}`
  //         mySqlServer.mySql(mySql).then(res => {
  //           if (res) {
  //             // 修改默认地址状态
  //             const onSql = `update shop_address set isDefault=${isDefault} where id=${data.id}`
  //             mySqlServer.mySql(onSql).then(res => {
  //               if (res) {
  //                 resolve(res)
  //               }
  //             })
  //           }
  //         }).catch(err => {
  //           reject(err)
  //         })
  //       } else {
  //         // 修改默认地址状态
  //         const onSql = `update shop_address set isDefault=${isDefault} where id=${data.id}`
  //         mySqlServer.mySql(onSql).then(res => {
  //           if (res) {
  //             resolve(res)
  //           }
  //         })
  //       }
  //     })
  //   } else {
  //     resolve()
  //   }
  // })
  const res = await allFn()
  if (res) {
    ctx.success('', '成功')
  } else {
    ctx.fail('失败', -1)
  }
}

exports.getDetails = async (ctx) => {
  // 查询地址详情
  const { id } = ctx.request.body
  if (!id) {
    ctx.fail('参数错误', -1)
    return
  }
  const res = await ShopAdderess.findOne({ where: { id: id }})
  if (res) {
    res['isDefault'] = res.isDefault != 0
    ctx.success(res, '成功')
  } else {
    ctx.fail('失败', -1)
  }
}
