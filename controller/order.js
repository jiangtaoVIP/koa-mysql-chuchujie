// INSERT INTO shop_order (orderId) VALUES (md5(uuid()))
// const mySqlServer = require("../mysql/index.js")
const jwt = require('../models/tokenFn')
const { getFile } = require('../models/getfile')
const model = require('../models/model')
const { Op } = require("sequelize") // 操作符

const ShopOrder = model.shopOrder.ShopOrder //获取模型
const MyGoods = model.goodsdetails.MyGoods //获取模型
const User = model.user.User //获取模型
const MyGoodsListSku = model.goodsdetailsSku.MyGoodsListSku //获取模型
const MyGoodsList = model.goodsdetailsList.MyGoodsList //获取模型
const MyGoodsListType = model.goodsdetailsType.MyGoodsListType //获取模型
const ShopAdderess = model.shopAddress.ShopAdderess //获取模型

exports.add = async(ctx) => {
  const userId = jwt.verify(ctx.header)
  if (!userId || userId == -1) {
    ctx.fail('参数错误', -1)
    return
  }
  const { addressId, descText, goodsId, list, none_sku, adminId } = ctx.request.body
  if (!addressId || !goodsId || !list || !adminId) {
    ctx.fail('参数错误', -1)
    return
  }
  // const allFn = new Promise(async(resolve) => {
  //   const uuid_sql = `select md5(uuid())`
  //   const uuid_res = await mySqlServer.mySql(uuid_sql)
  //   if (uuid_res) {
  //     const add_params = [
  //       uuid_res[0]['md5(uuid())'],
  //       userId,
  //       goodsId,
  //       JSON.stringify(list),
  //       none_sku ? 1 : 0,
  //       descText ? descText : '',
  //       addressId,
  //       adminId
  //     ]
  //     const add_sql = `insert into shop_order (orderId,userId,goodsId,list,none_sku,descText,addressId,adminId) values (?,?,?,?,?,?,?,?)`
  //     const add_res = await mySqlServer.mySql(add_sql, add_params)
  //     if (add_res) {
  //       resolve({
  //         id: add_res.insertId,
  //         code: 0
  //       })
  //     }
  //   }
  // })
  function allFn() {
    return new Promise(async(resolve) => {
      let data = {
        userId: userId,
        goodsId: goodsId,
        list: JSON.stringify(list),
        none_sku: none_sku,
        adminId: adminId,
        addressId: addressId,
        descText: descText ? descText : undefined
      }
      const res = await ShopOrder.create(data)
      console.log(res)
      if (res) {
        resolve(res)
      } else {
        resolve(-1)
      }
    })
  }
  const res = await allFn()
  if (res !== -1) {
    ctx.success('', '成功')
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
      // const promise = skus.map(it => mySqlServer.mySql(`select * from goodsdetails_sku where k_s = '${it}'`))
      const promise = skus.map(it => MyGoodsListSku.findAll({ where: { k_s: it }}))
      const all = await Promise.all(promise)
      if (all.length > 0) {
        // const promise_two = all.map(item => mySqlServer.mySql(`select * from goodsdetails_type where skuId=${item[0].id} and parentId='${id}'`))
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
// 获取商品详情异步
function goodsdetails(id) {
  return new Promise(async(resolve) => {
    const res = await MyGoods.findOne({ where: { id: id }})
    if (res) {
      // 只会查询到一个商品id 直接拿0索引
      res['none_sku'] = res.none_sku != 0
      res['skuList'] = []
      skuListFn(res['sku'], id).then(sku_res => {
        // 获取sku列表
        if (sku_res.length > 0) {
          sku_res.forEach(v => {
            res['skuList'].push(v[0])
          })
        }
        res['sku'] = res.sku.split(',').filter(item => item !== '')
        // 查询店铺详情
        User.findOne({ where: { id: res.adminId }}).then(admin_res => {
          getFile(admin_res.avatar).then(url => { // 获取头像地址后再返回
            admin_res.avatar = url
            resolve({
              goods: res,
              admin: admin_res
            })
          })
        })
      })
    }
  })
}
// 获取选择的list数据
function listSelect(list) {
  return new Promise(async(resolve) => {
    if (typeof(list) == 'string') {
      const listData = JSON.parse(list)
      if (listData.length > 0) {
        let fag = 0
        let dataList = []
        listData.forEach(item => {
          // 一个商品的list不可能同时出现 无规格和有规格两种list
          // 判断 可以直接else返回，不会发生 循环中异步返回了值导致错误
          if (item.listId) {
            // mySqlServer.mySql(`select * from goodsdetails_list where id = ${item.listId}`).then(res => {
            //   fag ++
            //   res[0]['cart_num'] = item.cart_num
            //   for(let key in res[0]) {
            //     if (res[0][key] == null) {
            //       delete res[0][key]
            //     }
            //   }
            //   dataList.push(res[0])
            //   if (fag === listData.length) {
            //     resolve(dataList)
            //   }
            // })
            MyGoodsList.findOne({ where: { id: item.listId }}).then(res => {
              fag ++
              res['cart_num'] = item.cart_num
              for(let key in res) {
                if (res[key] == null) {
                  delete res[key]
                }
              }
              dataList.push(res)
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
// 获得地址详情
function addressDetails(id) {
  return new Promise(async(resolve) => {
    const res = await ShopAdderess.findOne({ where: {id: id }})
    if (res) {
      res['isDefault'] = res.isDefault != 0
      resolve(res)
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
  function allFn() {
    return new Promise(async(resolve) => {
      // const total_sql = `select count(*) from shop_order where userId = ${userId} and orderStatus like '%${orderStatus}%' order by updateTime desc`
      // const page_sql = `select * from shop_order where userId = ${userId} and orderStatus like '%${orderStatus}%' order by updateTime desc limit ${(page-1)*size},${size}`
      // const total_res = await mySqlServer.mySql(total_sql)
      // const page_res = await mySqlServer.mySql(page_sql)
      // if (total_res.length > 0 && page_res.length > 0) {
      //   const total = total_res[0]['count(*)']
      //   body.total = total // 总页数
      //   body.pageNum = Math.trunc((total + (size -1) )/size) // 分页数量
      //   body.page = parseInt(page) // 页码
      //   body.size = parseInt(size) // 页数
      //   body.list = page_res // 数据
      //   let fag = 0
      //   if (body.list.length > 0) {
      //     for (let i = 0; i < body.list.length; i++) {
      //       bodyListFn(body.list[i]).then(body_res => {
      //         fag++
      //         body.list[i] = body_res
      //         if (fag === body.list.length) {
      //           resolve(body)
      //         }
      //       })
      //     }
      //   } else {
      //     resolve(-1)
      //   }
      // } else {
      //   resolve(body)
      // }
      const res = await ShopOrder.findAndCountAll({
        order: [['updateTime', 'DESC']],
        where: {
          userId: userId,
          orderStatus: {
            [Op.like]: `%${orderStatus ? orderStatus : ''}%`
          }
        },
        offset: (page-1) * size,
        limit: parseInt(size)
      })
      if (res) {
        let flag = 0
        for (let i = 0; i < res.rows.length; i++) {
          await bodyListFn(res.rows[i]).then(body_res => {
            flag++
            res.rows[i] = body_res
            if (flag === res.rows.length) {
              resolve(res)
            }
          })
        }

      }
    })
  }
  const res = await allFn()
  if (res != -1) {
    ctx.success({
      total: res.count, // 总页数
      pageNum: Math.trunc((res.count + (size -1) )/size), // 分页数量
      page: parseInt(page), // 页码
      size: parseInt(size), // 页数
      list: res.rows
    })
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
      const status_res = await ShopOrder.update({ orderStatus: orderStatus }, {
        where: { id: id }
      })
      if (status_res[0] === 1) {
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
  // const sql = `delete from shop_order where id in (${id})`
  // const res = await mySqlServer.mySql(sql)
  const res = await ShopOrder.destroy({ where: { id: id }})
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
    const res = await ShopOrder.findOne({ where: { id: id }})
    if (res) {
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
  // let nameList = []
  // nameList = name.split(' ')
  // for (let i =0; i < nameList.length; i++) {
  //   nameList[i] = `name like '%${nameList[i]}%' and`
  // }
  // nameList = nameList.toString()
  // if (nameList.indexOf('and') !== -1) {
  //   nameList = nameList.substr(0, nameList.length - 3)
  // }
  // nameList = nameList.replace(/,/g, ' ')

  // 查询用户所属的id 订单列表
  function selectOrder(list) {
    return new Promise(async(resolve) => {
      // const sql = `select * from shop_order where userId = ${userId}`
      // const res = await mySqlServer.mySql(sql)
      const res = await ShopOrder.findAll({ where: { userId: userId }})
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
      // 分割
      let nameList = name.split(' ').map(item => {
        return { name: { [Op.like]: `%${item}%` }}
      })

      const res = await MyGoods.findAll({ where: {
        [Op.or]: nameList
      }})
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