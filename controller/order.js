// INSERT INTO shop_order (orderId) VALUES (md5(uuid()))
const mySqlServer = require("../mysql/index.js")
const jwt = require('../model/tokenFn')
const { getFile } = require('../model/getfile')

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


// 获取订单详情数据方法 （抽出来公用）（用于分页查询列表和查询详情路由）
// start
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
        res[0]['none_sku'] = res[0].none_sku != 0
        res[0]['skuList'] = []
        skuListFn(res[0]['sku'], id).then(sku_res => {
          // 获取sku列表
          if (sku_res.length > 0) {
            sku_res.forEach(v => {
              res[0]['skuList'].push(v[0])
            })
          }
          res[0]['sku'] = res[0].sku.split(',').filter(item => item !== '')
          // 查询店铺详情
          mySqlServer.mySql(`select * from admin_user where id = ${res[0].adminId}`).then(admin_res => {
            // 获取 图片地址2
            getFile(admin_res[0].avatar).then(url => {
              admin_res[0].avatar = url
              resolve({
                goods: res[0],
                admin: admin_res[0]
              })
            }).catch(err => {
              resolve({
                goods: res[0],
                admin: admin_res[0]
              })
            })
          })
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
function addressDetails(id) {
  return new Promise(async(resolve) => {
    const res = await mySqlServer.mySql(`select * from shop_address where id = ${id}`)
    if (res.length > 0) {
      res[0]['isDefault'] = res[0].isDefault != 0
      resolve(res[0])
    } else {
      resolve({})
    }
  })
} 
// end
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
  // 每个数据的item 异步
  function bodyListFn(item) {
    return new Promise(async(resolve) => {
      // 获取商品详情和sku类目 替换掉goodsId
      const goods_res = await goodsdetails(item.goodsId)
      const list_res = await listSelect(item.list)
      if (goods_res && list_res) {
        item['goods'] = goods_res.goods
        item['admin'] = goods_res.admin
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

exports.changeOrderStatus = async(ctx) => {
  const { id, orderStatus } = ctx.request.body
  if (!id || !orderStatus) {
    ctx.fail('参数错误', -1)
    return
  }
  function allFn() {
    return new Promise(async(resolve) => {
      const status_sql = `update shop_order set orderStatus='${orderStatus}' where id =${id}`
      const status_res = await mySqlServer.mySql(status_sql)
      if (status_res) {
        resolve('成功')
      } else {
        resolve(-1)
      }
    })
  }
  const res = await allFn()
  if (res != -1) {
    ctx.success('', res)
  } else {
    ctx.fail('失败', -1)
  }
}

exports.deleteOrder = async(ctx) => {
  const { id } = ctx.request.body
  if (!id) {
    ctx.fail('参数错误', -1)
    return
  }
  const sql = `delete from shop_order where id in (${id})`
  const res = await mySqlServer.mySql(sql)
  if (res) {
    ctx.success('', '成功')
  } else {
    ctx.fail('失败', -1)
  }
}

exports.details = async (ctx) => {
  const { id } = ctx.request.body
  if (!id) {
    ctx.fail('参数错误', -1)
    return
  }
  const allFn = new Promise(async(resolve) => {
    const sql = `select * from shop_order where id = ${id}`
    const res = await mySqlServer.mySql(sql)
    if (res.length > 0) {
      // 方法放在了外面 goodsdetails listSelect
      const goods_res = await goodsdetails(res[0].goodsId)
      const list_res = await listSelect(res[0].list)
      // 方法放在了外面 获得地址详情
      const address_res = await addressDetails(res[0].addressId)
      if (goods_res && list_res && address_res) {
        res[0]['goods'] = goods_res.goods
        res[0]['admin'] = goods_res.admin
        res[0]['list'] = list_res
        res[0]['address'] = address_res
        resolve(res[0])
      } else {
        resolve(-1)
      }
    } else {
      resolve(-1)
    }
  })
  const res = await allFn
  if (res != -1) {
    ctx.success(res, '成功')
  } else {
    ctx.fail('失败', -1)
  }
}

exports.searchOederList = async(ctx) => {
  const userId = jwt.verify(ctx.header)
  if (!userId || userId == -1) {
    ctx.fail('参数错误', -1)
    return
  }
  // 商品数据列表信息和订单列表是分开的
  // 先迷糊查询商品 再查询是否在订单中有这个商品
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
  // 查询用户所属的id 订单列表
  function selectOrder(list) {
    return new Promise(async(resolve) => {
      const sql = `select * from shop_order where userId = ${userId}`
      const res = await mySqlServer.mySql(sql)
      if (res !== undefined && res.length > 0) {
        const serachList = []
        res.forEach(item => {
          list.forEach(v => {
            if (item.goodsId == v.id) {
              serachList.push(item)
            }
          })
        })
        resolve(serachList)
      } else {
        resolve([])
      }
    })
  }
  function getGoodsPromise(res) {
    return new Promise(async(resolve) => {
      // 方法放在了外面 goodsdetails listSelect
      const goods_res = await goodsdetails(res.goodsId)
      const list_res = await listSelect(res.list)
      // 方法放在了外面 获得地址详情
      const address_res = await addressDetails(res.addressId)
      if (goods_res && list_res && address_res) {
        res['goods'] = goods_res.goods
        res['admin'] = goods_res.admin
        res['list'] = list_res
        res['address'] = address_res
        resolve(res)
      } else {
        resolve(res)
      }
    })
  }
  function allFn() {
    return new Promise(async(resolve) => {
      const sql = `select * from goodsdetails where ${nameList}`
      console.log(sql)
      const res = await mySqlServer.mySql(sql)
      if (res !== undefined && res.length > 0) {
        // 先用名称 匹配商品列表
        selectOrder(res).then(result => {
          // 返回对应的订单数据 再轮询获取订单详情返回
          let fag = 0
          const data = []
          for (let i = 0; i < result.length; i++) {
            getGoodsPromise(result[i]).then(v => {
              fag ++
              data.push(v)
              if (fag === result.length) {
                resolve(data)
              }
            })
          }
        })
      } else {
        resolve([])
      }
    })
  }
  const res = await allFn()
  ctx.success(res, '成功')
}