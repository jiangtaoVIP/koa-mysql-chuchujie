// // 文件名：models/files.js
const { Sequelize, Model, DataTypes } = require("sequelize")

const { sequelize } = require("../../config/db.js");

class MyGoodsListRate extends Model {

}

MyGoodsListRate.init({
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true, // 自动增长
        comment: '评论id',
        primaryKey: true // 主键字段
    },
    userId: Sequelize.INTEGER(11),
    orderId: {
      type: DataTypes.UUID,
      comment: '订单id'
    },
    adminId: {
      type: Sequelize.INTEGER(11),
      comment: '店铺id'
    },
    goodsId: {
      type: Sequelize.INTEGER(11),
      comment: '所属哪个商品的评论'
    },
    description: {
      type: Sequelize.STRING(512),
      comment: '评论说明'
    },
    count: {
      type: Sequelize.BOOLEAN,
      comment: '评分等级',
      defaultValue: 0
    }
}, {
    sequelize,
    tableName: "goodsdetails_rate", // 如果不设置tableName，自动生成的数据库中的admin_user表的表名为admin_user
    freezeTableName: false,
    timestamps: true
})
MyGoodsListRate.sync({ alter: true }) // 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
//timestamp字段，默认为true，表示数据库中是否会自动更新createdAt和updatedAt字段，false表示不会增加这个字段。
//freezeTableName,默认为true,会自动给表名表示为复数: user => users，为false则表示，使用我设置的表名
module.exports = {
  MyGoodsListRate
}