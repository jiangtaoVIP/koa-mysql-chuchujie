// 文件名：core/db.js
// 你现在应该使用 cls-hooked 软件包来支持 CLS.
const cls = require('cls-hooked')
const namespace = cls.createNamespace('....')

const Sequelize = require("sequelize")

Sequelize.useCLS(namespace)

// 使用sequelize操作数据库，必须导入数据库依赖包，这里导的是mysql2
const sequelize = new Sequelize('shop', 'root', 'root', { // 数据库名  用户名  密码
    dialect: 'mysql', // 数据库类型，这里是mysql
    host: 'localhost', // 主机号，这里是localhost
    port: '3306', // 端口号，这里是3306
    logging: false, // 是否显示SQL语句 // 执行过程会log一些SQL的logging，设为false不显示
    timezone: "+08:00", // 时区，如果没有设置，会导致数据库中的时间字段与中国时区时间相差8小时
    dialectOptions: { // 格式化时间
      charset: 'utf8mb4',
      dateStrings: true,
      typeCast: true
    },
    define: {
      timestamps: true, // 是否自动创建时间字段， 默认会自动创建createdAt、updatedAt
      createdAt: "createTime", // 重命名字段
      updatedAt: "updateTime",
      paranoid: false, // 是否自动创建deletedAt字段
      deletedAt: false, // 不想要 deletedAt
      underscored: false, // 开启下划线命名方式，默认是驼峰命名
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      supportBigNumbers: true,
      bigNumberStrings: true,
    },
    query: { raw: true } // 返回原始数据而不是 Sequelize 包装过得
});

// 由于goodsdetails_list表不需要同步模型，不全局设置模型同步，单个模型内设置

//创建表，默认是false，true则是删除原有表，再创建
// sequelize.sync({
//     // force: false // 每次启动都重新自动创建表 
//     alter: true // 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
// })

// 对连接进行测试，查看控制台
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('******Connection has been established successfully.********');
//         console.log('******连接数据库测试成功，即将退出！！！********');
//         process.exit(); //结束进程
//     })
//     .catch(err => {
//         console.error('***************Unable to connect to the database:***********');
//         console.error('***************无法连接到数据库:***********');
//         console.error(err);
//     });
module.exports = {
    sequelize
}