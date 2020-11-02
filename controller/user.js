const mySqlServer = require("../mysql/index.js")

exports.getList = async (ctx, next) => {
  await next()
  const query = ctx.request.query
  console.log(ctx.request.query, 'ctx')
  let page = query.page
  let size = query.size
  // var sql = `SELECT * FROM user limit ${(page-1)*size},${size};`
  // var sql = `SELECT count(*) FROM user `
  let sql = [
    `SELECT * FROM user limit ${(page-1)*size},${size};`,
    `SELECT count(*) FROM user;`
  ]
  let flag = 0
  sql.forEach((item, i) => {
    mySqlServer.mySql(item).then((res) => {
      flag ++
      console.log(res, '成功')
      if (flag === sql.length) {
        console.log('最终返回')
      }
    })
  })
  // var result = await mySqlServer.mySql(sql)
  // if (result) {
  //     console.log('查询成功', result)
  //     ctx.success(result, '查询成功')
  // } else {
  //   ctx.fail('查询失败', -1)
  // }
}