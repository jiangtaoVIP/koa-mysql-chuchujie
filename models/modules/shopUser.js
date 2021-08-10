// // 文件名：models/files.js
const { Sequelize, Model } = require("sequelize")

const { sequelize } = require("../../config/db.js")

const { encrypt } = require('../crypt')

class ShopUser extends Model {

}

ShopUser.init({
  userId: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true, // 自动增长
        comment: '用户id',
        primaryKey: true // 主键字段
    },
    userName: {
      type: Sequelize.STRING(512),
      comment: '用户昵称'
    },
    phone: {
      type: Sequelize.STRING(512),
      comment: '手机号（登录账号）',
      unique: true // 唯一的
    },
    email: {
      type: Sequelize.STRING(512),
      comment: '邮箱地址',
      unique: true // 唯一的
    },
    sex: {
      type: Sequelize.ENUM('M','W'),
      comment: '性别',
      defaultValue: 'M'
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
    avatar: {
      type: Sequelize.STRING(512),
      comment: '头像地址'
    },
    birthday: {
      type: Sequelize.STRING(512),
      comment: '生日时间戳'
    },
    descText: {
      type: Sequelize.STRING(512),
      comment: '个性签名'
    }
}, {
    sequelize,
    tableName: "shop_user", // 如果不设置tableName，自动生成的数据库中的admin_user表的表名为admin_user
    freezeTableName: false,
    timestamps: true
})
ShopUser.sync({ alter: true }) // 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
//timestamp字段，默认为true，表示数据库中是否会自动更新createdAt和updatedAt字段，false表示不会增加这个字段。
//freezeTableName,默认为true,会自动给表名表示为复数: user => users，为false则表示，使用我设置的表名
module.exports = {
  ShopUser
}