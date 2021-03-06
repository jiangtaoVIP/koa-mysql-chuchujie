const mySqlServer = require("../mysql/index.js")
require('dotenv').config()
const { DB_HOST, DB_PORT, ENV, PRO_HOST } = process.env
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
              item.icon = ENV == 'production' ? `http://${PRO_HOST}/image/${it[0].id}.${it[0].type}` : `http://${DB_HOST}:${DB_PORT}/image/${it[0].id}.${it[0].type}`
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
    // const promise = res.map(b => mySqlServer.mySql(`select * from goodsdetails_sku where parentId = ${b.id}`))
    // const skus = await Promise.all(promise)
    // const promiseTwo = res.map(b => mySqlServer.mySql(`select * from goodsdetails_type where parentId = ${b.id}`))
    // const types = await Promise.all(promiseTwo)
    // const detailsSku = deleteArr(skus)
    // const detailsType = deleteArr(types)
    // res.forEach(item => {
    //   item['skus'] = []
    //   item['types'] = []
    //   detailsSku.forEach((sku, index) => {
    //     sku.forEach(it => {
    //       if (item.id == it.parentId) {
    //         item.skus.push(it)
    //       }
    //     })
    //   })
    //   detailsType.forEach(type => {
    //     type.forEach(it => {
    //       if (item.id == it.parentId) {
    //         item.types.push(it)
    //       }
    //     })
    //   })
    // })
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
  let body = {} // 总数据集合
  // 获取 sku 集合
  function skuPromise(skuList) {
    return new Promise(async(resolve, reject) => {
      const skus = skuList.split(',').filter(item => item !== '')
      if (skus.length > 0) {
        body['skuList'] = []
        const promise = skus.map(it => mySqlServer.mySql(`select * from goodsdetails_sku where k_s = '${it}'`))
        const all = await Promise.all(promise)
        if (all.length > 0) {
          const promise_two = all.map(item => mySqlServer.mySql(`select * from goodsdetails_type where skuId=${item[0].id} and parentId='${data.id}'`))
          const all_two = await Promise.all(promise_two)
          if (all_two.length > 0) {
            all.forEach(item => {
              item[0]['largeImageMode'] = item[0].largeImageMode != 0
              all_two.forEach(v => {
                if (item[0].id == v[0].skuId) {
                  item[0]['v'] = v
                  body['skuList'].push(item[0])
                }
              })
            })
            resolve()
          } else {
            body['skuList'] = []
            resolve()
          }
        }
      } else {
        body['skuList'] = []
        resolve()
      }
    })
  }

  // 获取list集合
  const listPromise = new Promise(async(resolve, reject) => {
    const listSQL = await mySqlServer.mySql(`select * from goodsdetails_list where parentId = ${data.id}`)
    if (listSQL && listSQL.length > 0) {
      // 删除为null的字段
      listSQL.forEach(item => {
        for (const prop in item) {
          if (item[prop] === null) {
            delete item[prop]
          }
        }
      })
    }
    body['list'] = listSQL
    resolve()
  })
  const sql = `select * from goodsdetails where id = ${data.id}`
  const res = await mySqlServer.mySql(sql)
  if (res) {
    if (res.length > 0) {
      res.forEach(item => {
        item['none_sku'] = item.none_sku != 0
        // item['price'] = item.price.toFixed(2)
      })
    }
    body = Object.assign(body, ...res)
    console.log(body)
    if (body.sku) {
      await Promise.all([skuPromise(body.sku), listPromise])
    } else {
      body['skuList'] = []
    }
    ctx.success(body, '成功')
  } else {
    ctx.fail('失败', -1)
  }
}


exports.searchGoodsList = async(ctx) => {
  const { name } = ctx.request.body
  if (!name) {
    ctx.success([], '成功')
    return
  }
  let nameList = []
  nameList = name.split(' ')
  for (let i =0; i < nameList.length; i++) {
    nameList[i] = `name like '%${nameList[i]}%' and`
  }
  nameList = nameList.toString()
  if (nameList.indexOf('and') !== -1) {
    nameList = nameList.substr(0, nameList.length - 3)
  }
  nameList = nameList.replace(/,/g, ' ')
  console.log(nameList)
  function allFn() {
    return new Promise(async(resolve) => {
      const sql = `select * from goodsdetails where ${nameList}`
      console.log(sql)
      const res = await mySqlServer.mySql(sql)
      resolve(res)
    })
  }
  const res = await allFn()
  ctx.success(res, '成功')
}