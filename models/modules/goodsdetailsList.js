// // 文件名：models/files.js
const { Sequelize, Model } = require("sequelize")

const { sequelize } = require("../../config/db.js");

class MyGoodsList extends Model {

}

MyGoodsList.init({
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true, // 自动增长
        comment: '所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合',
        primaryKey: true // 主键字段
    },
    parentId: {
      type: Sequelize.INTEGER(11),
      comment: '所属商品id'
    },
    price: {
      type: Sequelize.DECIMAL(11, 2),
      comment: '该组合价格'
    },
    stock_num: {
      type: Sequelize.INTEGER(11),
      comment: '该组合库存'
    },
    s1: {
      type: Sequelize.INTEGER(11),
      comment: '规格类目 k_s 为 s1 的对应规格值 id'
    } ,
    s2: {
      type: Sequelize.INTEGER(11),
      comment: '规格类目 k_s 为 s2 的对应规格值 id'
    },
    s3: Sequelize.INTEGER(11),
    s4: Sequelize.INTEGER(11)
}, {
    sequelize,
    tableName: "goodsdetails_list", // 如果不设置tableName，自动生成的数据库中的admin_user表的表名为admin_user
    freezeTableName: false,
    timestamps: true
})

MyGoodsList.sync() // 此表不同步

//timestamp字段，默认为true，表示数据库中是否会自动更新createdAt和updatedAt字段，false表示不会增加这个字段。
//freezeTableName,默认为true,会自动给表名表示为复数: user => users，为false则表示，使用我设置的表名
module.exports = {
  MyGoodsList
}