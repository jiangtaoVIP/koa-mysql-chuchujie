const mySqlServer = require("../mysql/index.js")
require('dotenv').config()
const { DB_HOST, DB_PORT, ENV, PRO_HOST } = process.env
// 传单个id 获取图片地址
exports.getFile = (id) => {
  return new Promise(async(resolve) => {
    const fileSql = `select * from file where id=${id}`
    const res = await mySqlServer.mySql(fileSql)
    if (res) {
      let url = ENV == 'production' ? `http://${PRO_HOST}/image/${res[0].id}.${res[0].type}` : `http://${DB_HOST}:${DB_PORT}/image/${res[0].id}.${res[0].type}`
      resolve(url)
    } else {
      resolve(id)
    }
  })
}