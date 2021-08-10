// // 文件名：models/files.js
const { Sequelize, Model, DataTypes } = require("sequelize")

const { sequelize } = require("../../config/db.js");

class ShopOrder extends Model {

}

ShopOrder.init({
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true, // 自动增长
        comment: '订单id',
        primaryKey: true // 主键字段
    },
    orderId: {
      type: DataTypes.UUID,
      comment: '订单号',
      defaultValue: Sequelize.UUIDV4 // 或 Sequelize.UUIDV1
    },
    userId: {
      type: Sequelize.INTEGER(11),
      comment: '所属的用户id'
    },
    goodsId: {
      type: Sequelize.INTEGER(11),
      comment: '所属的商品id'
    },
    adminId: {
      type: Sequelize.INTEGER(11),
      comment: '商品所属店铺id'
    },
    list: {
      type: Sequelize.STRING(9999),
      comment: '所属的规格list数据（可以有多个）'
    },
    none_sku: {
      type: Sequelize.BOOLEAN,
      comment: '是否为无规格商品(0 false，1 true)',
      defaultValue: 0
    },
    orderStatus: {
      type: Sequelize.ENUM('DFK','DFH','DSH','DPJ','YQX','YWC'),
      comment: '订单状态（DFK,DFH,DSH,DPJ,YQX,YWC）（代付款，代发货，待收货，待评价，已取消，已完成）',
      defaultValue: 'DFK'
    },
    descText: {
      type: Sequelize.STRING(512),
      comment: '订单备注（可为空）'
    },
    addressId: {
      type: Sequelize.INTEGER(11),
      comment: '订单收货地址'
    },
}, {
    sequelize,
    tableName: "shop_order", // 如果不设置tableName，自动生成的数据库中的admin_user表的表名为admin_user
    freezeTableName: false,
    timestamps: true
})
ShopOrder.sync({ alter: true }) // 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
//timestamp字段，默认为true，表示数据库中是否会自动更新createdAt和updatedAt字段，false表示不会增加这个字段。
//freezeTableName,默认为true,会自动给表名表示为复数: user => users，为false则表示，使用我设置的表名
module.exports = {
  ShopOrder
}