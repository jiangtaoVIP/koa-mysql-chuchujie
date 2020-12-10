const jwt = require('../model/tokenFn')
const mySqlServer = require("../mysql/index.js")

// 获取购物车列表
exports.getList = async(ctx) => {
  const userId = jwt.verify(ctx.header)
  if (!userId || userId == -1) {
    ctx.fail('参数错误', -1)
    return
  }
  // 3 获得 已加入购物车的商品列表
  function goodsList (arr) {
    return new Promise(async (resolve, reject) => {
      const promise = arr.map(item => mySqlServer.mySql(`select * from goodsdetails where id = ${item.goodsId}`))
      // const promise_two = arr.map(item => mySqlServer.mySql(`select * from goodsdetails_list where id = ${item.listId}`))
      let all = await Promise.all(promise)
      // let all_two = await Promise.all(promise_two)
      if (all.length > 0) {
        function deWeight() {
          // 数组对象去重
          for (var i = 0; i < all.length - 1; i++) {
              for (var j = i + 1; j < all.length; j++) {
                  if (all[i][0].id == all[j][0].id) {
                    all.splice(j, 1) //因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
                    j--
                  }
              }
          }
          return all
        }
        let newArr = deWeight()
        // 4 获得商品列表后进行 获取所有的sku类目异步 再返回
        const MygoodsData = await goodsFn(newArr)
        resolve(MygoodsData)
      } else {
        resolve([])
      }
    })
  }
  // 7获取sku 小类详细信息
  function goodDetails(form) {
    return new Promise(async(resolve) => {
      let skuList = []
      if (form.sku.length > 0) {
        const promise = form.sku.map(it => mySqlServer.mySql(`select * from goodsdetails_sku where k_s = '${it}'`))
        const all = await Promise.all(promise)
        if (all.length > 0) {
          const promise_two = all.map(item => mySqlServer.mySql(`select * from goodsdetails_type where skuId=${item[0].id} and parentId='${form.id}'`))
          const all_two = await Promise.all(promise_two)
          if (all_two.length > 0) {
            all.forEach(item => {
              item[0]['largeImageMode'] = item[0].largeImageMode != 0
              all_two.forEach(v => {
                if (item[0].id == v[0].skuId) {
                  item[0]['v'] = v
                  skuList.push(item[0])
                }
              })
            })
            resolve(skuList)
          } else {
            skuList = []
            resolve(skuList)
          }
        }
      } else {
        skuList = []
        resolve(skuList)
      }
    })
  }
  // 5 获取商品列表的所有sku规格列表
  function goodsFn(list) {
    return new Promise((resolve, reject) => {
      let fag = 0 // 定义的初始循环变量
      // 过滤 转化数组 sku 大类
      // const skus = list.filter(item => {
      //   if (item[0].sku) {
      //     item[0].sku = item[0].sku.split(',')
      //     return item[0].sku != ''
      //   }
      // })
      list.forEach(item => {
        item[0].sku = item[0].sku.split(',')
        if (item[0].sku == '' || !item[0].sku) {
          item[0].sku = item[0].sku.filter(item => item != '')
        }
      })
      for (let i = 0; i < list.length; i++) {
        // 6 进行 循环异步 分别获取sku 小类详细信息
        goodDetails(list[i][0]).then(res => {
          fag++
          list[i][0]['skuList'] = res
          // console.log(skus[i][0], '数据')
          if (fag === list.length) {
            resolve(list)
            // console.log('循环完成', skus)
          }
        })
      }
    })
  }
  // 8获取 已加入购物车的list规格类目
  function getCartList(arr) {
    return new Promise(async(resolve, reject) => {
      let fag = 0
      const list = []
      for (let i = 0; i< arr.length; i++) {
        mySqlServer.mySql(`select * from goodsdetails_list where id = ${arr[i].listId}`).then(res => {
          fag++
          // 有规格商品
          // 在此把shopcart 的id添加进List数据 用于删除
          res[0]['cartId'] = arr[i].id
          list.push(res[0])
          if (fag === arr.length) {
            // 删除为null的字段
            list.forEach((item, index) => {
              if (item == undefined) {
                list.splice(index, 1)
              }
              for (const prop in item) {
                if (item[prop] === null) {
                  delete item[prop]
                }
              }
            })
            resolve(list)
          }
        })
      }
    })
  }
  // 1先获取 购物车表 该用户加入的数据 (按最新时间排序)
  const res = await mySqlServer.mySql(`select * from shopcart where userId = ${userId} order by updateTime desc`)
  if (res !== undefined && res.length > 0) {
    // 2拿到数据列表 拿取里面的数据 分别进行异步操作 
    const result = await Promise.all([goodsList(res), getCartList(res)])

    // 9做完所有异步操作进行组装数据
    const dataList = [] // 购物车总数据
    const skuList = result[0] ? result[0] : [] // 商品列表 + sku类目
    const listList = result[1] ? result[1] : [] // 商品list列表
    // 组装数据
    // console.log(skuList, listList)
    if (result !== undefined && result.length > 0) {
      skuList.forEach(item => {
        item[0]['list'] = []
        listList.forEach(it => {
          res.forEach(value => {
            // 无规格商品
            // 把 shopCart表数据 加入到商品 数量 分别合并到List数据
            if (it.id == value.listId) {
              it['cart_num'] = value.cart_num
            }
          })
          // 再把List数据合并到 商品列表
          if (item[0].id == it.parentId) {
            item[0]['list'].push(it)
          }
        })
        // 如果商品 没有规格类目的话 把shopCart 选择的数量 合并到商品列表
        // 在此把shopcart 的id添加进List数据 用于删除
        if (item[0].sku.length <= 0 || item[0].list.length <= 0) {
          res.forEach(v => {
            if (v.goodsId == item[0].id) {
              item[0]['cart_num'] = v.cart_num
              item[0]['cartId'] = v.id
            }
          })
        }
      })
      // skuList格式从数组-数组-对象转换为数组-对象 并且合并到总数据 最后返回前端
      // 并且把 none_sku是否为无规格商品(0 false，1 true) 转化为布尔
      skuList.forEach(item => {
        if (item[0].none_sku != undefined) { item[0]['none_sku'] = item[0]['none_sku'] != 0 }
        dataList.push(item[0])
      })
      ctx.success(dataList, '成功')
    } else {
      ctx.success([], '成功')
    }
  } else {
    ctx.success([], '成功')
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
      const params = [
        userId, data.goodsId, data.listId, data.none_sku ? 1 : 0, data.cart_num
      ]
      const sql = `insert into shopcart (userId,goodsId,listId,none_sku,cart_num) values (?,?,?,?,?)`
      const res = await mySqlServer.mySql(sql, params)
      if (res) {
        resolve(0)
      } else {
        resolve(-1)
      }
    })
  }
  // 修改购物车 数据方法
  function updataShopCart(id, num) {
    return new Promise(async (resolve) => {
      const updata_sql = `update shopcart set cart_num = cart_num + ${num} where id = ${id}`
      const updata_res = await mySqlServer.mySql(updata_sql)
      if (updata_res) {
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
        const none_sku_sql = `select * from shopcart where listId = ${data.listId}`
        const res_none_sku = await mySqlServer.mySql(none_sku_sql)
        // 2-1查找是否有相同规格商品
        if (res_none_sku.length > 0) {
          // 有 修改数量
          const updata_res = await updataShopCart(res_none_sku[0].id, data.cart_num)
          resolve(updata_res)
        } else {
          // 无 添加
          const insert_res = await insertShopCart()
          resolve(insert_res)
        }
      } else {
        // 3无规格商品 判断
        const true_sku_sql = `select * from shopcart where goodsId = ${data.goodsId} and none_sku = 1`
        const true_sku_res = await mySqlServer.mySql(true_sku_sql)
        // 3-1查找是否有相同商品
        if (true_sku_res.length > 0) {
          // 有 修改数量
          const updata_res_two = await updataShopCart(true_sku_res[0].id, data.cart_num)
          resolve(updata_res_two)
        } else {
          // 无 添加
          const insert_res_two = await insertShopCart()
          resolve(insert_res_two)
        }
      }
    })
  }
  // 返回
  const res = await allList()
  if (res == 0) {
    ctx.success('', '成功')
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
  const sql = `delete from shopcart where id in (${data.cartIds})`
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
