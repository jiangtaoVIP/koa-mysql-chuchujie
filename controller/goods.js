const mySqlServer = require("../mysql/index.js")
require('dotenv').config()
const { DB_HOST, DB_PORT } = process.env
// 获取商品一级分类
exports.categoryOne = async(ctx, next) => {
  const sql = `select * from category_one`
  const res = await mySqlServer.mySql(sql)
  if (res) {
    ctx.success(res, '成功')
  } else {
    ctx.fail('失败', -1)
  }
}
// 获取商品二级分类
exports.categoryTwo = async(ctx, next) => {
  const data = ctx.request.body
  if (!data.id) {
    ctx.fail('参数错误', -1)
    return
  }
  const getTwo = new Promise(async(resolve, reject) => {
    const sql = `select * from category_two where parentId = ${data.id}`
    const res = await mySqlServer.mySql(sql)
    if (res && res.length > 0) {
      const promise = res.map(v => mySqlServer.mySql(`select * from file where id=${v.icon}`))
      let all = await Promise.all(promise)
      if (all.length > 0) {
        res.forEach(item => {
          all.forEach(it => {
            if (item.icon == it[0].id) {
              item.icon = `http://${DB_HOST}:${DB_PORT}/upload/image/${it[0].id}.${it[0].type}`
            }
          })
        })
        resolve(res)
      }
    } else {
      reject(-1)
    }
  })
  const res = await getTwo
  if (res != -1) {
    ctx.success(res, '成功')
  } else {
    ctx.fail('失败', -1)
  }
}
// 根据二级分类获取三级 商品列表
exports.getGoodsList = async(ctx, next) => {
  const data = ctx.request.body
  if (!data.id) {
    ctx.fail('参数错误', -1)
    return
  }
  const sql = `select * from goodsdetails where parentId = ${data.id}`
  const res = await mySqlServer.mySql(sql)
  if (res && res.length > 0) {
    const promise = res.map(b => mySqlServer.mySql(`select * from goodsdetails_sku where parentId = ${b.id}`))
    const skus = await Promise.all(promise)
    const promiseTwo = res.map(b => mySqlServer.mySql(`select * from goodsdetails_type where parentId = ${b.id}`))
    const types = await Promise.all(promiseTwo)
    const detailsSku = deleteArr(skus)
    const detailsType = deleteArr(types)
    res.forEach(item => {
      item['skus'] = []
      item['types'] = []
      detailsSku.forEach((sku, index) => {
        sku.forEach(it => {
          if (item.id == it.parentId) {
            item.skus.push(it)
          }
        })
      })
      detailsType.forEach(type => {
        type.forEach(it => {
          if (item.id == it.parentId) {
            item.types.push(it)
          }
        })
      })
    })
    ctx.success(res, '成功')
  } else {
    ctx.fail('失败', -1)
  }
}
function deleteArr(list) {
  list.forEach((item, index) => {
    if (item.length === 0) {
      list.splice(index, 1)
    }
  })
  return list
}
// 根据商品id 获取详情
exports.goodDetails = async (ctx, next) => {
  const data = ctx.request.body
  if (!data.id) {
    ctx.fail('参数错误', -1)
    return
  }
  const sql = `select * from goodsdetails where id = ${data.id}`
  const res = await mySqlServer.mySql(sql)
  
  if (res) {
    const skuSQL = await mySqlServer.mySql(`select * from goodsdetails_sku where parentId = ${res[0].id}`)
    const typeSQL = await mySqlServer.mySql(`select * from goodsdetails_type where parentId = ${res[0].id}`)
    res[0]['skus'] = skuSQL
    res[0]['types'] = typeSQL
    ctx.success(res[0], '成功')
  } else {
    ctx.fail('失败', -1)
  }
}