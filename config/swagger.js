const router = require('koa-router')(); // 引入路由函数
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
require('dotenv').config()
const { DB_HOST, DB_PORT, ENV, PRO_HOST } = process.env
const swaggerDefinition = {
  info: {
    title: '楚楚街api接口',
    version: '1.0.0',
    description: 'API'
  },
  host: ENV == 'production' ? PRO_HOST : `${DB_HOST}:${DB_PORT}`,
  basePath: '/' // Base path (optional)
};
const options = {
  swaggerDefinition,
  // 写有注解的router的存放地址(当你新增swagger时文档里没显示出来的话那么就是这边地址没有加进去)
  apis: ['./routes/*.js', './routes/image/*.js'] // routes下所有的js文件和routes/image下所有js文件
};
const swaggerSpec = swaggerJSDoc(options);
// 通过路由获取生成的注解文件
router.get('/swagger.json', async ctx => {
  ctx.set('Content-Type', 'application/json');
  ctx.body = swaggerSpec;
});
module.exports = router;
// 将页面暴露出去