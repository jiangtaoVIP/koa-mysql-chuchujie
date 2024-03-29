const model = require('../models/model')

const jwt = require('../models/tokenFn')
const mySqlServer = require("../mysql/index.js")
const { getFile } = require('../models/getfile')

const ShopCart = model.shopCart.ShopCart //获取模型
const MyGoods = model.goodsdetails.MyGoods //获取模型
const MyGoodsListSku = model.goodsdetailsSku.MyGoodsListSku //获取模型
const MyGoodsListType = model.goodsdetailsType.MyGoodsListType //获取模型
const MyGoodsList = model.goodsdetailsList.MyGoodsList //获取模型

// 获取购物车列表
exports.getList = async(ctx) => {
  const userId = jwt.verify(ctx.header)
  const { page, size } = ctx.request.query
  if (!userId || !page || !size) {
    ctx.fail('参数错误', -1)
    return
  }
  // 3 获得 已加入购物车的商品列表
  // function goodsList (arr) {
  //   return new Promise(async (resolve, reject) => {
  //     const promise = arr.map(item => mySqlServer.mySql(`select * from goodsdetails where id = ${item.goodsId}`))
  //     // const promise_two = arr.map(item => mySqlServer.mySql(`select * from goodsdetails_list where id = ${item.listId}`))
  //     let all = await Promise.all(promise)
  //     // let all_two = await Promise.all(promise_two)
  //     if (all.length > 0) {
  //       function deWeight() {
  //         // 数组对象去重
  //         for (var i = 0; i < all.length - 1; i++) {
  //             for (var j = i + 1; j < all.length; j++) {
  //                 if (all[i][0].id == all[j][0].id) {
  //                   all.splice(j, 1) //因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
  //                   j--
  //                 }
  //             }
  //         }
  //         return all
  //       }
  //       let newArr = deWeight()
  //       // 4 获得商品列表后进行 获取所有的sku类目异步 再返回
  //       const MygoodsData = await goodsFn(newArr)
  //       resolve(MygoodsData)
  //     } else {
  //       resolve([])
  //     }
  //   })
  // }
  // // 7获取sku 小类详细信息
  // function goodDetails(form) {
  //   return new Promise(async(resolve) => {
  //     let skuList = []
  //     if (form.sku.length > 0) {
  //       const promise = form.sku.map(it => mySqlServer.mySql(`select * from goodsdetails_sku where k_s = '${it}'`))
  //       const all = await Promise.all(promise)
  //       if (all.length > 0) {
  //         const promise_two = all.map(item => mySqlServer.mySql(`select * from goodsdetails_type where skuId=${item[0].id} and parentId='${form.id}'`))
  //         const all_two = await Promise.all(promise_two)
  //         if (all_two.length > 0) {
  //           all.forEach(item => {
  //             item[0]['largeImageMode'] = item[0].largeImageMode != 0
  //             all_two.forEach(v => {
  //               if (item[0].id == v[0].skuId) {
  //                 item[0]['v'] = v
  //                 skuList.push(item[0])
  //               }
  //             })
  //           })
  //           resolve(skuList)
  //         } else {
  //           skuList = []
  //           resolve(skuList)
  //         }
  //       }
  //     } else {
  //       skuList = []
  //       resolve(skuList)
  //     }
  //   })
  // }
  // // 5 获取商品列表的所有sku规格列表
  // function goodsFn(list) {
  //   return new Promise((resolve, reject) => {
  //     let fag = 0 // 定义的初始循环变量
  //     // 过滤 转化数组 sku 大类
  //     // const skus = list.filter(item => {
  //     //   if (item[0].sku) {
  //     //     item[0].sku = item[0].sku.split(',')
  //     //     return item[0].sku != ''
  //     //   }
  //     // })
  //     list.forEach(item => {
  //       item[0].sku = item[0].sku.split(',')
  //       if (item[0].sku == '' || !item[0].sku) {
  //         item[0].sku = item[0].sku.filter(item => item != '')
  //       }
  //     })
  //     for (let i = 0; i < list.length; i++) {
  //       // 6 进行 循环异步 分别获取sku 小类详细信息
  //       goodDetails(list[i][0]).then(res => {
  //         fag++
  //         list[i][0]['skuList'] = res
  //         // console.log(skus[i][0], '数据')
  //         if (fag === list.length) {
  //           resolve(list)
  //           // console.log('循环完成', skus)
  //         }
  //       })
  //     }
  //   })
  // }
  // // 8获取 已加入购物车的list规格类目
  // function getCartList(arr) {
  //   return new Promise(async(resolve, reject) => {
  //     let fag = 0
  //     const list = []
  //     for (let i = 0; i< arr.length; i++) {
  //       mySqlServer.mySql(`select * from goodsdetails_list where id = ${arr[i].listId}`).then(res => {
  //         fag++
  //         list.push(res[0])
  //         if (fag === arr.length) {
  //           // 删除为null的字段
  //           list.forEach((item, index) => {
  //             if (item == undefined) {
  //               list.splice(index, 1)
  //             }
  //             for (const prop in item) {
  //               if (item[prop] === null) {
  //                 delete item[prop]
  //               }
  //             }
  //           })
  //           resolve(list)
  //         }
  //       })
  //     }
  //   })
  // }
  // // 1先获取 购物车表 该用户加入的数据 (按最新时间排序)
  // const res = await mySqlServer.mySql(`select * from shopcart where userId = ${userId} order by updateTime desc`)
  // if (res !== undefined && res.length > 0) {
  //   // 2拿到数据列表 拿取里面的数据 分别进行异步操作 
  //   const result = await Promise.all([goodsList(res), getCartList(res)])

  //   // 9做完所有异步操作进行组装数据
  //   const dataList = [] // 购物车总数据
  //   const skuList = result[0] ? result[0] : [] // 商品列表 + sku类目
  //   const listList = result[1] ? result[1] : [] // 商品list列表
  //   // 组装数据
  //   // console.log(skuList, listList)
  //   if (result !== undefined && result.length > 0) {
  //     skuList.forEach(item => {
  //       item[0]['list'] = []
  //       listList.forEach(it => {
  //         res.forEach(value => {
  //           // 无规格商品
  //           // 把 shopCart表数据 加入到商品 数量 分别合并到List数据
  //           if (it.id == value.listId) {
  //             it['cart_num'] = value.cart_num
  //             it['cartId'] = value.id
  //           }
  //         })
  //         // 再把List数据合并到 商品列表
  //         if (item[0].id == it.parentId) {
  //           item[0]['list'].push(it)
  //         }
  //       })
  //       // 如果商品 没有规格类目的话 把shopCart 选择的数量 合并到商品列表
  //       // 在此把shopcart 的id添加进List数据 用于删除
  //       if (item[0].sku.length <= 0 || item[0].list.length <= 0) {
  //         res.forEach(v => {
  //           if (v.goodsId == item[0].id) {
  //             item[0]['cart_num'] = v.cart_num
  //             item[0]['cartId'] = v.id
  //           }
  //         })
  //       }
  //     })
  //     // skuList格式从数组-数组-对象转换为数组-对象 并且合并到总数据 最后返回前端
  //     // 并且把 none_sku是否为无规格商品(0 false，1 true) 转化为布尔
  //     skuList.forEach(item => {
  //       if (item[0].none_sku != undefined) { item[0]['none_sku'] = item[0]['none_sku'] != 0 }
  //       dataList.push(item[0])
  //     })
  //     ctx.success(dataList, '成功')
  //   } else {
  //     ctx.success([], '成功')
  //   }
  // } else {
  //   ctx.success([], '成功')
  // }
  //
  // 6 获取 已加入购物车的list规格类目
  function getCartList(listId) {
    return new Promise(async(resolve) => {
      let list = []
      if (listId) { // 是否为无规格商品
        const res = await MyGoodsList.findOne({
          where: { id: listId }
        })
        if (res) {
          for (const prop in res) {
            if (res[prop] === null) {
              delete res[prop]
            }
          }
          list.push(res)
          resolve(list)
        } else {
          resolve([])
        }
      } else {
        resolve([])
      }
    })
  }
  // 5 获取商品列表的所有sku规格列表
  function skuList(skuString, goodsId) {
    return new Promise(async(resolve) => {
      let skuData = []
      const skuList = skuString.split(',').filter(item => item != '' || item != null)
      if (skuList.length > 0) { // 有sku规格
        const promise_sku = skuList.map(it => MyGoodsListSku.findAll({ where: { k_s: it }}))
        const all = await Promise.all(promise_sku)
        if (all) { // 查找完大类 找小类sku
          const promise_two = all[0].map(item => MyGoodsListType.findAll({ where: { skuId: item.id, parentId: goodsId }}))
          const all_two = await Promise.all(promise_two)
          if (all_two.length > 0) { // 完整的小类也查找出来了
            // 先把小类的图片url获取
            const imgUrl = new Promise(async(resolve) => { // 获取规格类目图片，只有第一个规格类目可以定义图片
              let flag = 0
              for (let i = 0; i < all_two[0].length; i++) {
                getFile(all_two[0][i].imgUrl).then(res => {
                  flag++
                  all_two[0][i].imgUrl = res
                  if (flag === all_two[0].length) {
                    resolve('success')
                  }
                })
              }
            })
            const previewImgUrl = new Promise(async(resolve) => { // 获取用于预览显示的规格类目图片
              let flag = 0
              for (let i = 0; i < all_two[0].length; i++) {
                getFile(all_two[0][i].previewImgUrl).then(res => {
                  flag++
                  all_two[0][i].previewImgUrl = res
                  if (flag === all_two[0].length) {
                    resolve('success')
                  }
                })
              }
            })
            // 执行全部图片地址异步后再返回
            // 合并数据
            let fileAll = await Promise.all([imgUrl, previewImgUrl])
            if (fileAll) {
              all[0].forEach(item => {
                item['largeImageMode'] = item.largeImageMode != 0
                item['v'] = []
                all_two[0].forEach(v => {
                  if (item.id == v.skuId) {
                    item['v'].push(v)
                  }
                })
                skuData.push(item)
              })
              resolve(skuData)
            }
          } else {
            skuData = []
            resolve(skuData)
          }
        }
      } else {
        skuData = []
        resolve(skuData)
      }
    })
  }
  // 3 获得 已加入购物车的商品列表详情
  function goodsList(goodsId) {
    return new Promise(async(resolve) => {
      const res = await MyGoods.findOne({ where: { id: goodsId }})
      if (res) {
        const iconId = new Promise(async(resolve) => { // 获取icon图标
          getFile(res.iconId).then(url => {
            res.iconId = url
            resolve('success')
          })
        })
        const homeImageIds = new Promise(async(resolve) => { // 获取轮播图
          getFile(res.homeImageIds).then(url => {
            res.homeImageIds = url
            resolve('success')
          })
        })
        const detailsImageIds = new Promise(async(resolve) => { // 获取轮播图
          getFile(res.detailsImageIds).then(url => {
            res.detailsImageIds = url
            resolve('success')
          })
        })
        // 4执行全部文件异步后再返回
        const promise_all = await Promise.all([skuList(res.sku, res.id), iconId, homeImageIds, detailsImageIds])
        if (promise_all && promise_all.length === 4) {
          res['skuList'] = promise_all[0]
          resolve(res)
        }
      }
    })
  }
  function allFn() {
    return new Promise(async(resolve) => {
      // 1先获取 购物车表 该用户加入的数据 (按最新时间排序)
      const cart_list = await ShopCart.findAndCountAll({
        order: [['updateTime', 'DESC']],
        where: {
          userId: userId
        },
        offset: (page-1) * size,
        limit: parseInt(size)
      })
      if (cart_list && cart_list.rows.length > 0) {
        // 2拿到数据列表 拿取里面的数据 分别进行异步操作 
        let flag = 0
        let data = []
        for (let i = 0; i < cart_list.rows.length; i++) {
          await Promise.all([goodsList(cart_list.rows[i].goodsId), getCartList(cart_list.rows[i].listId)]).then(res => {
            flag ++
            let goodsData = res[0] // 商品数据
            let listData = res[1] // list数据
            goodsData['none_sku'] = goodsData['none_sku'] !== 0 // 转化布尔
            goodsData['list'] = []
            if (listData.length > 0) { // 大于0则表示有规格商品
              listData.forEach(item => {
                item = Object.assign(item, { // 把购物车表的数据添加到list
                  cart_num: cart_list.rows[i].cart_num,
                  cartId: cart_list.rows[i].id
                })
              })
            } else { // 表示无规格商品（把shopCart 选择的数量 合并到商品列表）
              goodsData['cart_num'] = cart_list.rows[i].cart_num
              goodsData['cartId'] = cart_list.rows[i].id
            }
            goodsData['list'] = listData
            data.push(goodsData)
            if (flag === cart_list.rows.length) {
              cart_list.rows = data
              resolve(cart_list)
            }
          })
        }
      } else {
        resolve(cart_list)
      }
    })
  }

  const res = await allFn()
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

// 加入购物车
exports.add = async(ctx) => {
  const userId = jwt.verify(ctx.header)
  if (!userId || userId == -1) {
    ctx.fail('参数错误', -1)
    return
  }
  const data = ctx.request.body
  if (!data.goodsId || data.none_sku == undefined || !data.cart_num) {
    ctx.fail('参数错误', -1)
    return
  }
  // 增加购物车方法
  function insertShopCart() {
    return new Promise(async (resolve) => {
      // const params = [
      //   userId, data.goodsId, data.listId, data.none_sku ? 1 : 0, data.cart_num
      // ]
      // const sql = `insert into shopcart (userId,goodsId,listId,none_sku,cart_num) values (?,?,?,?,?)`
      // const res = await mySqlServer.mySql(sql, params)
      let prop = {
        userId: userId,
        goodsId: data.goodsId,
        none_sku: data.none_sku,
        cart_num: data.cart_num,
        listId: data.listId ? data.listId : undefined
      }
      const res = await ShopCart.create(prop)
      if (res) {
        resolve(0)
      } else {
        resolve(-1)
      }
    })
  }
  // 修改购物车 数据方法
  function updataShopCart(id, num, cart_num) {
    return new Promise(async (resolve) => {
      // const updata_sql = `update shopcart set cart_num = cart_num + ${num} where id = ${id}`
      // const updata_res = await mySqlServer.mySql(updata_sql)
      const updata_res = await ShopCart.update({ cart_num: parseInt(num + cart_num)  }, { // 把传过来的数量和原有的相加
        where: { id: id }
      })
      if (updata_res[0] === 1) {
        resolve(0)
      } else {
        resolve(-1)
      }
    })
  }

  function allList() {
    return new Promise(async (resolve) => {
      // 1先判断是否有相同商品 如果有直接增加数量

      // 2判断是否 无规格商品
      if (!data.none_sku) {
        // const none_sku_sql = `select * from shopcart where listId = ${data.listId}`
        // const res_none_sku = await mySqlServer.mySql(none_sku_sql)
        const res_none_sku = await ShopCart.findOne({ where: { listId: data.listId }})
        // 2-1查找是否有相同规格商品
        if (res_none_sku) {
          // 有 修改数量
          const updata_res = await updataShopCart(res_none_sku.id, data.cart_num, res_none_sku.cart_num)
          // resolve(updata_res)
          resolve('已有相同规格商品，增加响相应商品数量')
        } else {
          // 无 添加
          const insert_res = await insertShopCart()
          // resolve(insert_res)
          resolve('添加成功')
        }
      } else {
        // 3无规格商品 判断
        // const true_sku_sql = `select * from shopcart where goodsId = ${data.goodsId} and none_sku = 1`
        // const true_sku_res = await mySqlServer.mySql(true_sku_sql)
        const true_sku_res = await ShopCart.findOne({ where: { goodsId: data.goodsId, none_sku: data.none_sku }})
        // 3-1查找是否有相同商品
        if (true_sku_res) {
          // 有 修改数量
          const updata_res_two = await updataShopCart(true_sku_res.id, data.cart_num, true_sku_res.cart_num)
          // resolve(updata_res_two)
          resolve('已有相同规格商品，增加响相应商品数量')
        } else {
          // 无 添加
          const insert_res_two = await insertShopCart()
          // resolve(insert_res_two)
          resolve('添加成功')
        }
      }
    })
  }
  // 返回
  const res = await allList()
  if (res) {
    ctx.success('', res)
  } else {
    ctx.fail('失败', -1)
  }
}

// 删除商品购物车
exports.delete = async (ctx) => {
  const data = ctx.request.body
  if (!data.cartIds) {
    ctx.fail('参数错误', -1)
    return
  }
  let flag = 0
  let cartIdList = data.cartIds.split(',').filter(item => item )
  for (let i = 0; i < cartIdList.length; i++) {
    await ShopCart.destroy({ where: { id: cartIdList[i] } }).then(res => {
      flag++
      if (flag === cartIdList.length) {
        ctx.success('', '成功')
      }
    })
  }
  // const sql = `delete from shopcart where id in (${data.cartIds})`
  // const res = await mySqlServer.mySql(sql)
  // const res = await ShopCart.destroy({ where: { id: data.cartIds } })
  // console.log(res)
  // if (res) {
  //   ctx.success('', '成功')
  // } else {
  //   ctx.fail('失败', -1)
  // }
}

// 修改购物车
exports.edit = async(ctx) => {
  const data = ctx.request.body
  if (!data.id || data.none_sku === undefined) {
    ctx.fail('参数错误', -1)
    return
  }
  function updateShopCart() {
    return new Promise(async(resolve) => {
      // const edit_params = [data.listId, data.cart_num, data.id]
      // const edit_sql = `update shopcart set listId=?,cart_num=? where id =?`
      // const edit_res = await mySqlServer.mySql(edit_sql, edit_params)
      let prop = {
        listId: data.listId ? data.listId : undefined,
        cart_num: data.cart_num,
        id: data.id,
        none_sku: data.none_sku
      }
      const edit_res = await ShopCart.update(prop, { where: { id: data.id }})
      if (edit_res[0] === 1) {
        resolve({
          code: 0,
          message: '成功'
        })
      } else {
        resolve({
          code: -1,
          message: '失败'
        })
      }
    })
  }
  const allFn = new Promise(async(resolve) => {
    // 判断是否有规格商品 没有listId则无规格
    if (data.listId && data.oldListId) {
      // 先查询是否有相同规格的 有就返回提示有相同的

      // 旧的 和新的 不对等 直接拿新的查询 数据库是否存在
      if (data.listId != data.oldListId) {
        // const weight_res = await mySqlServer.mySql(`select * from shopcart where listId = ${data.listId}`)
        const weight_res = await ShopCart.findAll({ where: { listId: data.listId } })
        if (weight_res.length > 0) {
          resolve({
            code: 0,
            message: '你已选过该款式'
          })
        } else {
          // 没有 相同款式则直接修改
          const editData = await updateShopCart()
          resolve(editData)
        }
      } else {
        // 旧的 和新的 对等 说明没有改listId 直接修改
        const editData = await updateShopCart()
        resolve(editData)
      }
    } else {
      // 无规格 直接修改
      const editData = await updateShopCart()
      resolve(editData)
    }
  })
  const res = await allFn
  if (res.code === 0) {
    ctx.success('', res.message)
  } else {
    ctx.fail('失败', -1)
  }
}