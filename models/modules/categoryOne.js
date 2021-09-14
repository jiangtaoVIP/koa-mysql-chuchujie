// // 文件名：models/files.js
const { Sequelize, Model } = require("sequelize")

const { sequelize } = require("../../config/db.js");

class CategoryOne extends Model {

}

CategoryOne.init({
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true, // 自动增长
        comment: '商品分类id',
        primaryKey: true // 主键字段
    },
    type: {
      type: Sequelize.STRING(255),
      comment: '分类字段名'
    },
    name: {
      type: Sequelize.STRING(255),
      comment: '分类名称'
    }
}, {
    sequelize,
    tableName: "category_one", // 如果不设置tableName，自动生成的数据库中的admin_user表的表名为admin_user
    freezeTableName: false,
    timestamps: true
})
CategoryOne.sync({ alter: true }) // 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
//timestamp字段，默认为true，表示数据库中是否会自动更新createdAt和updatedAt字段，false表示不会增加这个字段。
//freezeTableName,默认为true,会自动给表名表示为复数: user => users，为false则表示，使用我设置的表名
module.exports = {
  CategoryOne
}