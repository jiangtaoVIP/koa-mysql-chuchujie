const mySqlServer = require("../mysql/index.js")
const { getFile } = require('../model/getfile')

exports.getDetails = async(ctx) => {
  const data = ctx.request.body
  if (!data.adminId) {
    ctx.fail('参数错误', -1)
    return
  }
  const sql = `select * from admin_user where id = ${data.adminId}`
  const res = await mySqlServer.mySql(sql)
  if (res) {
    res[0].avatar = await getFile(res[0].avatar)
    let data = res[0]
    const all = {
      id: data.id,
      userName: data.userName,
      phone: data.phone,
      avatar: data.avatar,
      descText: data.descText,
      createTime: data.createTime,
      updateTime: data.updateTime
    }
    ctx.success(all, '成功')
  } else {
    ctx.fail('失败', -1)
  }
}

exports.getList = async(ctx) => {
  console.log('1111')
  // 获取 所有商品列表（分页处理）
  const {adminId, page, size} = ctx.request.body
  if (!adminId) {
    ctx.fail('参数错误', -1)
    return
  }
  if (!page || !size) {
    ctx.fail('参数错误', -1)
    return
  }
  const body = {
    page: 0,
    size: 0,
    pageNum: 0,
    total: 0,
    list: []
  }
  const forGoods = new Promise(async(resolve) => {
    // 获取分页数量
    const sql = `select count(*) from goodsdetails where adminId = ${adminId}`
    const res = await mySqlServer.mySql(sql)
    if (res && res.length > 0) {
      const total = res[0]['count(*)']
      body.total = total // 总页数
      body.pageNum = Math.trunc((total + (size -1) )/size) // 分页数量
      resolve(res)
    } else {
      resolve([])
    }
  })
  const goodsList = new Promise(async(resolve) => {
    // 按最新时间 分页查询
    const sql = `select * from goodsdetails where adminId = ${adminId} order by updateTime desc limit ${(page-1)*size},${size}`
    const res = await mySqlServer.mySql(sql)
    if (res && res.length > 0) {
      body.list = res // 数据
      resolve(res)
    } else {
      resolve([])
    }
    body.page = parseInt(page) // 页码
    body.size = parseInt(size) // 页数
  })
  const res = await Promise.all([forGoods, goodsList])
  if (res && res.length > 0) {
    ctx.success(body, '成功')
  } else {
    ctx.fail('失败', -1)
  }
}