// // 文件名：models/files.js
const { Sequelize, Model } = require("sequelize")

const { sequelize } = require("../../config/db.js");

class MyGoods extends Model {

}

MyGoods.init({
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true, // 自动增长
        comment: '商品id',
        primaryKey: true // 主键字段
    },
    parentId: {
      type: Sequelize.INTEGER(11),
      comment: '该商品所属的二级分类id'
    },
    adminId: {
      type: Sequelize.INTEGER(11),
      comment: '所属店铺id'
    },
    name: {
      type: Sequelize.STRING(255),
      comment: '商品名称'
    },
    iconId: {
      type: Sequelize.STRING(255),
      comment: '商品缩略图'
    },
    homeImageIds: {
      type: Sequelize.STRING(9999),
      comment: '商品首页轮播'
    },
    detailsImageIds: {
      type: Sequelize.STRING(9999),
      comment: '商品详情图'
    },
    hot: {
      type: Sequelize.STRING(255),
      comment: '商品宣传小字段'
    },
    none_sku: {
      type: Sequelize.BOOLEAN,
      comment: '是否为无规格商品(0 false，1 true)',
      defaultValue: 1
    },
    stock_num: {
      type: Sequelize.INTEGER(11),
      comment: '商品总库存'
    },
    price: {
      type: Sequelize.STRING(255),
      comment: '默认价格'
    },
    oldPrice: {
      type: Sequelize.STRING(255),
      comment: '旧的价格'
    },
    sku: {
      type: Sequelize.STRING(255),
      comment: '所拥有的的规格类目'
    }
}, {
    sequelize,
    tableName: "goodsdetails", // 如果不设置tableName，自动生成的数据库中的admin_user表的表名为admin_user
    freezeTableName: false,
    timestamps: true
})
MyGoods.sync({ alter: true }) // 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
//timestamp字段，默认为true，表示数据库中是否会自动更新createdAt和updatedAt字段，false表示不会增加这个字段。
//freezeTableName,默认为true,会自动给表名表示为复数: user => users，为false则表示，使用我设置的表名
module.exports = {
  MyGoods
}