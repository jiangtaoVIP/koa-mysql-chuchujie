var mysql = require("mysql")
var config = require('../config/default')
// 连接数据库
const pool = mysql.createPool({
  host: config.dataBase.host,
  user: config.dataBase.user,
  password: config.dataBase.password,
  database: config.dataBase.database,
  port: config.dataBase.port
})
function mySql(sql, params) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log("sql语句错误", err)
        resolve(err)
      } else {
        connection.query(sql, params, (err, result) => {
          if (err) {
            console.log("参数错误", err)
            reject(err)
          } else {
            console.log("sql成功")
            resolve(result)
          }
          connection.release()
        })
      }
    })
  })
}
// 旧的写法
// function mySql(sql,params) {
//   return new Promise(function (resolve, reject) {
//       console.log('连接', config, config.dataBase)
//       var connction = mysql.createConnection({
//           host: config.dataBase.host,
//           user: config.dataBase.user,
//           password: config.dataBase.password,
//           database: config.dataBase.database,
//           port: config.dataBase.port
//       })
//       connction.connect()
//       connction.query(sql,params, function (err, result) {
//           if ((err)) {
//               console.log("sql语句错误", err)
//               reject(err)
//           } else {
//               if (result.length === 0) {
//                   console.log("参数错误", err)
//                   reject(err)
//               } else {
//                   console.log("成功")
//                   resolve(result)
//               }
//           }
//       })
//       connction.end()
//   })
// }

module.exports = {
  mySql: mySql
}