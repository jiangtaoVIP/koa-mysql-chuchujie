const jwt = require('../model/tokenFn')
const mySqlServer = require("../mysql/index.js")


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
      const promise_two = arr.map(item => mySqlServer.mySql(`select * from goodsdetails_list where id = ${item.listId}`))
      let all = await Promise.all(promise)
      let all_two = await Promise.all(promise_two)
      if (all.length > 0 && all_two.length > 0) {
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
      }
    })
  }
  // 5 获取商品列表的所有sku规格列表
  function goodsFn(list) {
    return new Promise((resolve, reject) => {
      let fag = 0 // 定义的初始循环变量
      // 过滤 转化数组 sku 大类
      const skus = list.filter(item => {
        if (item[0].sku) {
          item[0].sku = item[0].sku.split(',')
          return item[0].sku != ''
        }
      })
      for (let i = 0; i < skus.length; i++) {
        // 6 进行 循环异步 分别获取sku 小类详细信息
        goodDetails(skus[i][0]).then(res => {
          fag++
          skus[i][0]['sku'] = res
          // console.log(skus[i][0], '数据')
          if (fag === skus.length) {
            // console.log(skus[i][0])
            resolve(skus)
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
          list.push(res[0])
          if (fag === arr.length) {
            // 删除为null的字段
            list.forEach(item => {
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
  // 1先获取 购物车表 该用户加入的数据
  const res = await mySqlServer.mySql(`select * from shopcart where userId = ${userId}`)
  if (res !== undefined && res.length > 0) {
    // 2拿到数据列表 拿取里面的数据 分别进行异步操作 
    const result = await Promise.all([goodsList(res), getCartList(res)])

    // 9做完所有异步操作进行组装数据
    const dataList = [] // 购物车总数据
    const skuList = result[0] ? result[0] : [] // 商品列表 + sku类目
    const listList = result[1] ? result[1] : [] // 商品list列表
    // 组装数据
    if (result !== undefined && result.length > 0) {
      skuList.forEach(item => {
        item[0]['list'] = []
        listList.forEach(it => {
          res.forEach(value => {
            if (it.id == value.listId) {
              it['cart_num'] = value.cart_num
            }
          })
          if (item[0].id == it.parentId) {
            item[0]['list'].push(it)
          }
        })
      })
      // skuList格式从数组-数组-对象转换为数组-对象 并且合并到总数据 最后返回前端
      console.log(skuList)
      skuList.forEach(item => {
        dataList.push(item[0])
      })
      ctx.success(dataList, '成功')
    } else {
      ctx.success([], '成功')
    }
  } else {
    ctx.fail('失败', -1)
  }
}