// session 配置
const sessionConfig = {
  key: 'appletsystem:sess', //cookie key (default is koa:sess) 默认
  maxAge: 60000, // cookie 的过期时间 maxAge in ms (default is 1 days)             【需要修改】
  autoCommit: true, // 自动提交到响应头（默认是true）
  overwrite: true, //是否可以 重写 (默认 default true) 
  httpOnly: true, //cookie 是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true, //签名默认 true
  rolling: true, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false） 【需要修改 跟下面的二选一】
  renew: false, //等快要到期时重置 ☆前提是你此次请求的session还没有过期 然后在发请求的时候会给你重置为新的  【需要修改】
}
module.exports = sessionConfig
