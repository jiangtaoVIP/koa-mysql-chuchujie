const mySqlServer = require("../mysql/index.js")

exports.getList = async (ctx, next) => {
  await next()
  /*
  获取用户列表
  page = 页码（必填）
  size = 页数（必填）
  phone = 电话号码（选填）
  userName = 用户名（选填）
  */
  const query = ctx.request.query
  const page = query.page
  const size = query.size
  const phone = query.phone ? query.phone : ''
  const userName = query.userName ? query.userName : ''
  if (!page || !size) {
    ctx.fail('参数错误', -1)
    return
  }
  let sql = [
    // `SELECT * FROM user limit ${(page-1)*size},${size};`,
    `select count(*) from user where userName like '%${userName}%' and phone like '%${phone}%';`,
    `select * from user where userName like '%${userName}%' and phone like '%${phone}%' limit ${(page-1)*size},${size};`,
  ]
  let result = {}
  const promise = sql.map(b => mySqlServer.mySql(b))
  let aa = await Promise.all(promise)
  aa.forEach(item => {
    if (item.length > 0 && item[0]['count(*)']) {
      result['total'] = item[0]['count(*)']
    } else {
      result['list'] = item
      result['page'] = parseInt(page)
      result['size'] = parseInt(size)
    }
  })
  ctx.success(result, '查询成功')
  // var result = await mySqlServer.mySql(sql)
  // if (result) {
  //     console.log('查询成功', ctx, result)
  //     ctx.success(result, '查询成功')
  // } else {
  //   ctx.fail('查询失败', -1)
  // }
}