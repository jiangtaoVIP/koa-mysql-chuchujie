// INSERT INTO shop_order (orderId) VALUES (md5(uuid()))
const mySqlServer = require("../mysql/index.js")
const jwt = require('../model/tokenFn')
exports.add = async(ctx) => {
  const userId = jwt.verify(ctx.header)
  if (!userId || userId == -1) {
    ctx.fail('参数错误', -1)
    return
  }
  const { addressId, descText, goodsId, list, none_sku } = ctx.request.body
  if (!addressId || !goodsId || !list) {
    ctx.fail('参数错误', -1)
    return
  }
  const allFn = new Promise(async(resolve) => {
    const uuid_sql = `select md5(uuid())`
    const uuid_res = await mySqlServer.mySql(uuid_sql)
    if (uuid_res) {
      const add_params = [
        uuid_res[0]['md5(uuid())'],
        userId,
        goodsId,
        JSON.stringify(list),
        none_sku ? 1 : 0,
        descText ? descText : '',
        addressId
      ]
      const add_sql = `insert into shop_order (orderId,userId,goodsId,list,none_sku,descText,addressId) values (?,?,?,?,?,?,?)`
      const add_res = await mySqlServer.mySql(add_sql, add_params)
      if (add_res) {
        resolve({
          id: add_res.insertId,
          code: 0
        })
      }
    }
  })
  const res = await allFn
  if (res.id && res.code === 0) {
    ctx.success(res, '成功')
  } else {
    ctx.fail('失败', -1)
  }
}

exports.getStatusList = async(ctx) => {
  const { page, size, orderStatus} = ctx.request.body
  const body = {
    page: 0,
    size: 0,
    pageNum: 0,
    total: 0,
    list: []
  }
  console.log(page, size, orderStatus)
  const userId = jwt.verify(ctx.header)
  if (!userId || userId == -1) {
    ctx.fail('参数错误', -1)
    return
  }
  if (!page || !size) {
    ctx.fail('参数错误', -1)
    return
  }
  // 获取sku异步
  function skuListFn(skuList, id) {
    return new Promise(async(resolve, reject) => {
      const skus = skuList.split(',').filter(item => item !== '')
      if (skus.length > 0) {
        const promise = skus.map(it => mySqlServer.mySql(`select * from goodsdetails_sku where k_s = '${it}'`))
        const all = await Promise.all(promise)
        if (all.length > 0) {
          const promise_two = all.map(item => mySqlServer.mySql(`select * from goodsdetails_type where skuId=${item[0].id} and parentId='${id}'`))
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
  // 获取商品详情异步
  function goodsdetails(id) {
    return new Promise(async(resolve) => {
      const sql = `select * from goodsdetails where id = ${id}`
      const res = await mySqlServer.mySql(sql)
      if (res) {
        if (res.length > 0) {
          // 只会查询到一个商品id 直接拿0索引
          res[0]['none_sku'] = res[0]['none_sku'] != 0
          res[0]['skuList'] = []
          skuListFn(res[0]['sku'], id).then(sku_res => {
            if (sku_res.length > 0) {
              sku_res.forEach(v => {
                res[0]['skuList'].push(v[0])
              })
            }
            resolve(res[0])
          })
        }
      }
    })
  }
  // 获取选择的list数据
  function listSelect(list) {
    return new Promise(async(resolve) => {
      if (typeof(list) == 'string') {
        const listData = JSON.parse(list)
        // console.log(listData, '11')
        if (listData.length > 0) {
          let fag = 0
          let dataList = []
          listData.forEach(item => {
            // 一个商品的list不可能同时出现 无规格和有规格两种list
            // 判断 可以直接else返回，不会发生 循环中异步返回了值导致错误
            if (item.listId) {
              mySqlServer.mySql(`select * from goodsdetails_list where id = ${item.listId}`).then(res => {
                fag ++
                res[0]['cart_num'] = item.cart_num
                for(let key in res[0]) {
                  if (res[0][key] == null) {
                    delete res[0][key]
                  }
                }
                dataList.push(res[0])
                if (fag === listData.length) {
                  resolve(dataList)
                }
              })
            } else {
              dataList.push(item)
              resolve(dataList)
            }
          })
        }
      } else {
        resolve([])
      }
    })
  }
  // 每个数据的item 异步
  function bodyListFn(item) {
    return new Promise(async(resolve) => {
      // 获取商品详情和sku类目 替换掉goodsId
      const goods_res = await goodsdetails(item.goodsId)
      const list_res = await listSelect(item.list)
      if (goods_res && list_res) {
        item['goodsId'] = goods_res
        item['list'] = list_res
        resolve(item)
      }
    })
  }
  // 总异步
  const allFn = new Promise(async(resolve) => {
    const total_sql = `select count(*) from shop_order where userId = ${userId} and orderStatus like '%${orderStatus}%' order by updateTime desc`
    const page_sql = `select * from shop_order where userId = ${userId} and orderStatus like '%${orderStatus}%' order by updateTime desc limit ${(page-1)*size},${size}`
    const total_res = await mySqlServer.mySql(total_sql)
    const page_res = await mySqlServer.mySql(page_sql)
    if (total_res.length > 0 && page_res.length > 0) {
      const total = total_res[0]['count(*)']
      body.total = total // 总页数
      body.pageNum = Math.trunc((total + (size -1) )/size) // 分页数量
      body.page = parseInt(page) // 页码
      body.size = parseInt(size) // 页数
      body.list = page_res // 数据
      let fag = 0
      if (body.list.length > 0) {
        for (let i = 0; i < body.list.length; i++) {
          bodyListFn(body.list[i]).then(body_res => {
            fag++
            body.list[i] = body_res
            if (fag === body.list.length) {
              resolve(body)
            }
          })
        }
      } else {
        resolve(-1)
      }
    } else {
      resolve(body)
    }
  })
  const res = await allFn
  if (res != -1) {
    ctx.success(body, '成功')
  } else {
    ctx.fail('失败', -1)
  }
}
