
const mySqlServer = require("../mysql/index.js")
const jwt = require('../model/tokenFn')
const { getFile } = require('../model/getfile')
exports.getStatusList = async(ctx) => {
  const userId = jwt.verify(ctx.header)
  if (!userId || userId == -1) {
    ctx.fail('参数错误', -1)
    return
  }
  const { page, size, status, goodsId } = ctx.request.body
  if (!page || !size || status === undefined) {
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
  function avatarFn(avatarId) {
    return new Promise(async(resolve) => {
      // 查询用户头像
      if (avatarId !== null && avatarId) {
        const res = await getFile(avatarId)
        if (res) {
          resolve(res)
        }
      } else {
        resolve('')
      }
    })
  }
  function userDetailsFn(id) {
    return new Promise(async(resolve) => {
      // 查询用户信息
      const sql = `select * from shop_user where userId=${id}`
      const res = await mySqlServer.mySql(sql)
      if (res && res.length > 0) {
        res[0].createTime = Date.parse(res[0].createTime)
        res[0].updateTime = Date.parse(res[0].updateTime)
        avatarFn(res[0].avatar).then(avatar_res => {
          res[0].avatar = avatar_res
          resolve(res[0])
        })
      } else {
        resolve({})
      }
    })
  }
  function ToTalFn() {
    return new Promise(async(resolve) => {
      // 获取分页数量
      const sql = `select count(*) from goodsdetails_rate where goodsId=${goodsId}`
      const res = await mySqlServer.mySql(sql)
      if (res !== undefined && res.length > 0) {
        resolve(res[0]['count(*)'])
      } else {
        resolve(0)
      }
    })
  }
  function ListFn() {
    return new Promise(async(resolve) => {
      // 按状态 分页查询
      let sql = ``
      switch (status) {
        case '': // 全部
          sql = `select * from goodsdetails_rate where goodsId=${goodsId} order by rand() limit ${(page-1)*size},${size}`
        break
        case 'newest': // 最新
          sql = `select * from goodsdetails_rate where goodsId=${goodsId} order by updateTime desc limit ${(page-1)*size},${size}`
        break
        case 'own': // 自己
          sql = `select * from goodsdetails_rate where goodsId=${goodsId} and userId=${userId} order by updateTime desc limit ${(page-1)*size},${size}`
      }
      const res = await mySqlServer.mySql(sql)
      if (res && res.length > 0) {
        let fag = 0
        // 循环中异步
        for (let i = 0; i < res.length; i++) {
          res[i].createTime = Date.parse(res[i].createTime)
          res[i].updateTime = Date.parse(res[i].updateTime)
          userDetailsFn(res[i].userId).then(call => {
            res[i]['user'] = call
            fag ++
            if (fag === res.length) {
              resolve(res)
            }
          })
        }
      } else {
        resolve([])
      }
    })
  }
  function allFn() {
    return new Promise(async(resolve) => {
      const total_res = await ToTalFn()
      const list_res = await ListFn()
      if (total_res !== undefined && list_res !== undefined) {
        body.total = total_res // 总数
        body.page = parseInt(page) // 页码
        body.size = parseInt(size) // 页数
        body.pageNum = Math.trunc((total_res + (size -1) )/size) // 分页数量
        body.list = list_res
        resolve(0)
      } else {
        resolve(-1)
      }
    })
  }
  const res = await allFn()
  if (res == 0) {
    ctx.success(body, '成功')
  } else {
    ctx.fail('失败', -1)
  }
}