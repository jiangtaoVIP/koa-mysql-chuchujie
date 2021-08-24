// const mySqlServer = require("../mysql/index.js")
require('dotenv').config()
// const { DB_HOST, DB_PORT, ENV, PRO_HOST } = process.env
const { getFile } = require('../models/getfile')
const { Op } = require("sequelize") // 操作符
const model = require('../models/model')
const CategoryOne = model.categoryOne.CategoryOne
const CategoryTwo = model.categoryTwo.CategoryTwo
const MyGoods = model.goodsdetails.MyGoods
const MyGoodsListSku = model.goodsdetailsSku.MyGoodsListSku //获取模型
const MyGoodsListType = model.goodsdetailsType.MyGoodsListType //获取模型
const MyGoodsList = model.goodsdetailsList.MyGoodsList //获取模型

// 获取商品一级分类
exports.categoryOne = async(ctx, next) => {
  // const sql = `select * from category_one`
  const res = await CategoryOne.findAll()
  if (res) {
    ctx.success(res, '成功')
  } else {
    ctx.fail('失败', -1)
  }
}
// 获取商品二级分类
exports.categoryTwo = async(ctx, next) => {
  const { id } = ctx.request.body
  if (!id) {
    ctx.fail('参数错误', -1)
    return
  }
  // const getTwo = new Promise(async(resolve, reject) => {
  //   const sql = `select * from category_two where parentId = ${data.id}`
  //   const res = await mySqlServer.mySql(sql)
  //   if (res && res.length > 0) {
  //     const promise = res.map(v => mySqlServer.mySql(`select * from file where id=${v.icon}`))
  //     let all = await Promise.all(promise)
  //     if (all.length > 0) {
  //       res.forEach(item => {
  //         all.forEach(it => {
  //           if (item.icon == it[0].id) {
  //             item.icon = ENV == 'production' ? `http://${PRO_HOST}/image/${it[0].id}.${it[0].type}` : `http://${DB_HOST}:${DB_PORT}/image/${it[0].id}.${it[0].type}`
  //           }
  //         })
  //       })
  //       resolve(res)
  //     }
  //   } else {
  //     reject(-1)
  //   }
  // })
  function allFn() {
    return new Promise(async(resolve) => {
      const res = await CategoryTwo.findAll({
        where: { parentId: id }
      })
      if (res.length > 0) {
        let flag = 0
        for (let i = 0; i < res.length; i++) {
          await getFile(res[i].icon).then(file_url => {
            flag++
            res[i].icon = file_url
            if (flag === res.length) {
              resolve(res)
            }
          })
        }
      } else {
        resolve(res)
      }
    })
  }
  const res = await allFn()
  if (res != -1) {
    ctx.success(res, '成功')
  } else {
    ctx.fail('失败', -1)
  }
}
// 根据二级分类获取三级 商品列表
exports.getGoodsList = async(ctx, next) => {
  const { id } = ctx.request.body
  if (!id) {
    ctx.fail('参数错误', -1)
    return
  }
  const res = await MyGoods.findAll({
    where: { parentId: id }
  })
  if (res.length > 0) {
    res.map(item => item.none_sku = item.none_sku === 1)
    ctx.success(res, '成功')
  } else {
    ctx.success(res, '成功')
  }
  // const sql = `select * from goodsdetails where parentId = ${data.id}`
  // const res = await mySqlServer.mySql(sql)
  // if (res && res.length > 0) {
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
  //   ctx.success(res, '成功')
  // } else {
  //   ctx.fail('失败', -1)
  // }
}
// function deleteArr(list) {
//   list.forEach((item, index) => {
//     if (item.length === 0) {
//       list.splice(index, 1)
//     }
//   })
//   return list
// }
// 获取sku异步
function skuListFn(skuList, id) {
  return new Promise(async(resolve, reject) => {
    const skus = skuList.split(',').filter(item => item !== '')
    if (skus.length > 0) {
      const promise = skus.map(it => MyGoodsListSku.findAll({ where: { k_s: it }}))
      const all = await Promise.all(promise)
      if (all.length > 0) {
        const promise_two = all.map(item => MyGoodsListType.findAll({ where: { skuId: item[0].id, parentId: id  }}))
        const all_two = await Promise.all(promise_two)
        if (all_two.length > 0) {
          all.forEach(item => {
            item[0]['largeImageMode'] = item[0].largeImageMode != 0
            all_two.forEach(v => {
              if (item[0].id == v[0].skuId) {
                item[0]['v'] = v
              }
            })
          })
          resolve(all)
        } else {
          resolve([])
        }
      }
    } else {
      resolve([])
    }
  })
}
function listFn(id) {
  return new Promise(async(resolve) => {
    const res = await MyGoodsList.findAll({ where: { parentId: id }})
    if (res.length > 0) {
      res.forEach(item => {
        for (let prop in item) {
          if (!item[prop]) {
            delete item[prop]
          }
        }
      })
      resolve(res)
    } else {
      resolve(res)
    }
  })
}
// 根据商品id 获取详情
exports.goodDetails = async (ctx, next) => {
  const { id } = ctx.request.body
  if (!id) {
    ctx.fail('参数错误', -1)
    return
  }
  // let body = {} // 总数据集合
  // // 获取 sku 集合
  // function skuPromise(skuList) {
  //   return new Promise(async(resolve, reject) => {
  //     const skus = skuList.split(',').filter(item => item !== '')
  //     if (skus.length > 0) {
  //       body['skuList'] = []
  //       const promise = skus.map(it => mySqlServer.mySql(`select * from goodsdetails_sku where k_s = '${it}'`))
  //       const all = await Promise.all(promise)
  //       if (all.length > 0) {
  //         const promise_two = all.map(item => mySqlServer.mySql(`select * from goodsdetails_type where skuId=${item[0].id} and parentId='${data.id}'`))
  //         const all_two = await Promise.all(promise_two)
  //         if (all_two.length > 0) {
  //           all.forEach(item => {
  //             item[0]['largeImageMode'] = item[0].largeImageMode != 0
  //             all_two.forEach(v => {
  //               if (item[0].id == v[0].skuId) {
  //                 item[0]['v'] = v
  //                 body['skuList'].push(item[0])
  //               }
  //             })
  //           })
  //           resolve()
  //         } else {
  //           body['skuList'] = []
  //           resolve()
  //         }
  //       }
  //     } else {
  //       body['skuList'] = []
  //       resolve()
  //     }
  //   })
  // }

  // // 获取list集合
  // const listPromise = new Promise(async(resolve, reject) => {
  //   const listSQL = await mySqlServer.mySql(`select * from goodsdetails_list where parentId = ${data.id}`)
  //   if (listSQL && listSQL.length > 0) {
  //     // 删除为null的字段
  //     listSQL.forEach(item => {
  //       for (const prop in item) {
  //         if (item[prop] === null) {
  //           delete item[prop]
  //         }
  //       }
  //     })
  //   }
  //   body['list'] = listSQL
  //   resolve()
  // })
  // const sql = `select * from goodsdetails where id = ${data.id}`
  // const res = await mySqlServer.mySql(sql)
  // if (res) {
  //   if (res.length > 0) {
  //     res.forEach(item => {
  //       item['none_sku'] = item.none_sku != 0
  //       // item['price'] = item.price.toFixed(2)
  //     })
  //   }
  //   body = Object.assign(body, ...res)
  //   console.log(body)
  //   if (body.sku) {
  //     await Promise.all([skuPromise(body.sku), listPromise])
  //   } else {
  //     body['skuList'] = []
  //   }
  //   ctx.success(body, '成功')
  // } else {
  //   ctx.fail('失败', -1)
  // }
  function allFn() {
    return new Promise(async(resolve) => {
      const res = await MyGoods.findOne({ where: { id: id }})
      if (res) { // 获取商品详情后 继续获取sku和list列表
        res['none_sku'] = res.none_sku != 0
        res['skuList'] = []
        const promise_all = await Promise.all([skuListFn(res.sku, res.id), listFn(res.id)])
        if (promise_all && promise_all.length === 2) {
          // 添加sku列表进商品详情
          promise_all[0].forEach(v => { // sku类别
            res['skuList'].push(v[0])
          })
          res['list'] = promise_all[1] // list列表
          res['sku'] = res.sku.split(',').filter(item => item !== '')
        }
        resolve(res)
      }
    })
  }
  const res = await allFn()
  if (res != -1) {
    ctx.success(res, '成功')
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
  function allFn() {
    return new Promise(async(resolve) => {
      // 分割
      let nameList = name.split(' ').map(item => {
        return { name: { [Op.like]: `%${item}%` }}
      })
      const res = await MyGoods.findAll({ where: {
        [Op.or]: nameList
      }})
      if (res.length > 0) {
        res.forEach(item => item.none_sku = item.none_sku === 1)
        resolve(res)
      } else {
        resolve(res)
      }
    })
  }
  const res = await allFn()
  ctx.success(res, '成功')
}