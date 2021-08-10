// // 文件名：models/files.js
const { Sequelize, Model } = require("sequelize")

const { sequelize } = require("../../config/db.js");

class MyGoodsListType extends Model {

}

MyGoodsListType.init({
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true, // 自动增长
        comment: '类型id',
        primaryKey: true // 主键字段
    },
    skuId: {
      type: Sequelize.INTEGER(11),
      comment: '所属商品规格类目 id'
    },
    parentId: {
      type: Sequelize.INTEGER(11),
      comment: '所属商品id'
    },
    name: {
      type: Sequelize.STRING(512),
      comment: '类型名称'
    },
    imgUrl: {
      type: Sequelize.STRING(512),
      comment: '规格类目图片，只有第一个规格类目可以定义图片'
    },
    previewImgUrl: {
      type: Sequelize.STRING(512),
      comment: '用于预览显示的规格类目图片'
    }
}, {
    sequelize,
    tableName: "goodsdetails_type", // 如果不设置tableName，自动生成的数据库中的admin_user表的表名为admin_user
    freezeTableName: false,
    timestamps: true
})
MyGoodsListType.sync({ alter: true }) // 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
//timestamp字段，默认为true，表示数据库中是否会自动更新createdAt和updatedAt字段，false表示不会增加这个字段。
//freezeTableName,默认为true,会自动给表名表示为复数: user => users，为false则表示，使用我设置的表名
module.exports = {
  MyGoodsListType
}