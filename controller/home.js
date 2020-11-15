const mySqlServer = require("../mysql/index.js")
exports.getData = async (ctx, next) => {
  const data = {
    message: null, // 首页通知
    forImageList: [], // 首页商品轮播
    forCategoryList: [], //  首页
    forGoodsList: [] // 商品中部随机推荐
  }
  const forImage = new Promise(async(resolve, reject) => {
    // 随机获取5条 商品数据
    const sql = `select * from goodsdetails order by rand() limit 5`
    const res = await mySqlServer.mySql(sql)
    if (res && res.length > 0) {
      res.forEach(item => {
        if (item.homeImageIds) {
          item.homeImageIds = item.homeImageIds.split(',').filter(item => item !== '')
        } else {
          item.homeImageIds = []
        }
        data['forImageList'].push({
          id: item.id,
          name: item.name,
          parentId: item.parentId,
          homeImageIds: item.homeImageIds[0]
        })
      })
      resolve(res)
    }
  })
  const forCategory = new Promise(async (resolve) => {
    // 随机获取4条二级分类数据
    const sql = `select * from category_two order by rand() limit 6`
    const res = await mySqlServer.mySql(sql)
    if (res && res.length > 0) {
      data.forCategoryList = res
      resolve(res)
    }
  })
  const forGoosList = new Promise(async (resolve) => {
    // 随机获取4条商品数据列表
    const sql = `select * from goodsdetails order by rand() limit 4`
    const res = await mySqlServer.mySql(sql)
    if (res && res.length > 0) {
      data.forGoodsList = res
      resolve(res)
    }
  })
  const forMessage = new Promise(async (resolve) => {
    // 随机获取1条通知
    const sql = `select * from message order by rand() limit 1`
    const res = await mySqlServer.mySql(sql)
    if (res && res.length > 0) {
      data.message = res[0]
      resolve(res)
    }
  })
  const result = await  Promise.all([forImage, forCategory, forGoosList, forMessage])
  if (result) {
    ctx.success(data, '成功')
  } else {
    ctx.fail('失败', -1)
  }
}
exports.goodsList = async (ctx, next) => {
  const { page, size} = ctx.request.body
  if (!page || !size) {
    ctx.fail('参数错误', -1)
    return
  }
  const body = {
    page: null,
    size: null,
    pageNum: null,
    total: null,
    list: null
  }
  const forGoods = new Promise(async(resolve) => {
    // 获取 所有商品列表（分页处理）
    // select count(*) from (select * from t2 limit 1) a
    const sql = `select count(*) from goodsdetails order by createTime desc`
    const res = await mySqlServer.mySql(sql)
    if (res && res.length > 0) {
      const total = res[0]['count(*)']
      body.total = total // 总页数
      body.pageNum = Math.trunc((total + (size -1) )/size) // 分页数量
    }
    resolve(res)
  })
  const goodsList = new Promise(async (resolve) => {
    // 按最新时间 分页查询
    const sql = `select * from goodsdetails order by createTime desc limit ${(page-1)*size},${size}`
    const res = await mySqlServer.mySql(sql)
    console.log(res)
    body.list = res // 数据
    body.page = parseInt(page) // 页码
    body.size = parseInt(size) // 页数
    resolve()
  })
  const res = await Promise.all([forGoods,goodsList])
  if (res && res.length > 0) {
    ctx.success(body, '成功')
  } else {
    ctx.fail('失败', -1)
  }
}