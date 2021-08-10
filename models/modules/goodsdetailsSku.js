// // 文件名：models/files.js
const { Sequelize, Model } = require("sequelize")

const { sequelize } = require("../../config/db.js");

class MyGoodsListSku extends Model {

}

MyGoodsListSku.init({
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true, // 自动增长
        comment: '商品规格类目 id',
        primaryKey: true // 主键字段
    },
    k: {
      type: Sequelize.STRING(512),
      comment: 'skuKeyName：规格类目名称'
    },
    k_s: {
      type: Sequelize.STRING(512),
      comment: 'skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id'
    },
    largeImageMode: {
      type: Sequelize.BOOLEAN,
      comment: 'largeImageMode是否展示大图模式（0 false ,1true）',
      defaultValue: 1
    }
}, {
    sequelize,
    tableName: "goodsdetails_sku", // 如果不设置tableName，自动生成的数据库中的admin_user表的表名为admin_user
    freezeTableName: false,
    timestamps: true
})
MyGoodsListSku.sync({ alter: true }) // 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
//timestamp字段，默认为true，表示数据库中是否会自动更新createdAt和updatedAt字段，false表示不会增加这个字段。
//freezeTableName,默认为true,会自动给表名表示为复数: user => users，为false则表示，使用我设置的表名
module.exports = {
  MyGoodsListSku
}