// const mySqlServer = require("../mysql/index.js")
const { getFile } = require('../models/getfile')

const model = require('../models/model')
const User = model.user.User
const MyGoods = model.goodsdetails.MyGoods

exports.getDetails = async(ctx) => {
  const { adminId } = ctx.request.body
  if (!adminId) {
    ctx.fail('参数错误', -1)
    return
  }
  // const sql = `select * from admin_user where id = ${data.adminId}`
  // const res = await mySqlServer.mySql(sql)
  const res = await User.findOne({ where: { id: adminId }})
  if (res) {
    const avatar_url = await getFile(res.avatar)
    if (avatar_url) {
      res.avatar = avatar_url
      ctx.success(res, '成功')
    } else {
      ctx.success(res, '成功')
    }
    
  } else {
    ctx.fail('失败', -1)
  }
}

exports.getList = async(ctx) => {
  // 获取 所有商品列表（分页处理）
  const {adminId, page, size} = ctx.request.body
  if (!page || !size || !adminId) {
    ctx.fail('参数错误', -1)
    return
  }
  // const body = {
  //   page: 0,
  //   size: 0,
  //   pageNum: 0,
  //   total: 0,
  //   list: []
  // }
  // const forGoods = new Promise(async(resolve) => {
  //   // 获取分页数量
  //   const sql = `select count(*) from goodsdetails where adminId = ${adminId}`
  //   const res = await mySqlServer.mySql(sql)
  //   if (res && res.length > 0) {
  //     const total = res[0]['count(*)']
  //     body.total = total // 总页数
  //     body.pageNum = Math.trunc((total + (size -1) )/size) // 分页数量
  //     resolve(res)
  //   } else {
  //     resolve([])
  //   }
  // })
  // const goodsList = new Promise(async(resolve) => {
  //   // 按最新时间 分页查询
  //   const sql = `select * from goodsdetails where adminId = ${adminId} order by updateTime desc limit ${(page-1)*size},${size}`
  //   const res = await mySqlServer.mySql(sql)
  //   if (res && res.length > 0) {
  //     body.list = res // 数据
  //     resolve(res)
  //   } else {
  //     resolve([])
  //   }
  //   body.page = parseInt(page) // 页码
  //   body.size = parseInt(size) // 页数
  // })
  function allFn() {
    return new Promise(async(resolve) => {
      const res = await MyGoods.findAndCountAll({
        order: [['updateTime', 'DESC']],
        where: { adminId: adminId },
        offset: (page-1) * size,
        limit: parseInt(size)
      })
      if (res.rows.length > 0) {
        res.rows.forEach(item => item.none_sku = item.none_sku === 1)
        resolve(res)
        return
      }
      resolve(res)
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