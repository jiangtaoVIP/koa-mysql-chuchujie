// 封装的sql语句 方便使用
// 未想好如何封装
// 增加数据
const INSERT_TABLE = (tableName, {key, val}) => `insert into ${tableName} (${key}) values (${val})`

module.exports = {
  INSERT_TABLE
}
