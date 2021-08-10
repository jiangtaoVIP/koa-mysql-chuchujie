// 文件名：models/user.js
const {Sequelize, Model} = require("sequelize")

const { sequelize } = require("../../config/db.js");

const { encrypt } = require('../crypt')

class User extends Model {

}

User.init({
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true, // 自动增长
        primaryKey: true, // 主键字段
        comment: '商家用户id'
    },
    userName: {
      type: Sequelize.STRING(512),
      comment: '商家店铺名称'
    },
    phone: {
      type: Sequelize.STRING(512),
      unique: true, // 唯一的,
      comment: '手机号（登录账号）（联系电话）'
    },
    email: {
      type: Sequelize.STRING(512),
      unique: true, // 唯一的
      comment: '商家邮箱'
    },
    avatar: {
      type: Sequelize.STRING(128),
      comment: '店铺头像地址'
    },
    rate: {
      type: Sequelize.BOOLEAN,
      comment: '店铺评分',
      defaultValue: 0
    },
    password: {
        type: Sequelize.STRING(512),
        // 对密码进行加密，监听属性，使用了观察者模式，当password属性值被改变时，就执行下面的操作，观察者模式在vue中使用的很多
        set(val) {
          // const salt = bcryptjs.genSaltSync(10);
          // const pwd = bcryptjs.hashSync(val, salt);
          const pwd = encrypt(val)
          // 将password属性的属性值设置为pwd
          this.setDataValue("password", pwd);
        }
    },
    descText: {
        type: Sequelize.STRING(512),
        comment: '店铺介绍'
    },
    addressName: {
      type: Sequelize.STRING(512),
      comment: '地址联系人'
    },
    province: {
      type: Sequelize.STRING(512),
      comment: '店铺省份'
    },
    city: {
      type: Sequelize.STRING(512),
      comment: '店铺城市'
    },
    county: {
      type: Sequelize.STRING(512),
      comment: '店铺区域'
    },
    addressDetail: {
      type: Sequelize.STRING(512),
      comment: '店铺详细地址'
    }
}, {
    sequelize,
    tableName: "admin_user", // 如果不设置tableName，自动生成的数据库中的admin_user表的表名为admin_user
    freezeTableName: false,
    timestamps: true
})
User.sync({ alter: true }) // 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
//timestamp字段，默认为true，表示数据库中是否会自动更新createdAt和updatedAt字段，false表示不会增加这个字段。
//freezeTableName,默认为true,会自动给表名表示为复数: user => users，为false则表示，使用我设置的表名
module.exports = {
    User
}