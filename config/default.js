require('dotenv').config()
const { DB_HOST, DB_PORT } = process.env
const config = {
  // 启动端口
  port: DB_PORT,
  // 数据库配置
  dataBase: {
    host: DB_HOST,
    user: "root",
    password: "root",
    database: "shop",
    port: '3301'
  }
}
module.exports = config