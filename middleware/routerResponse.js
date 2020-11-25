module.exports =  function routerResponse(option={}){
  return async function(ctx,next){
      ctx.success = function (data,msg) {
          ctx.type = option.type || 'json'
          ctx.body = {
              code : option.successCode || 0,
              data : data ? data : undefined,
              msg : msg
          }
      }

      ctx.fail = function (msg,code) {
          ctx.type = option.type || 'json'
          ctx.body = {
              code : code || option.failCode || 99,
              msg : msg || option.successMsg || 'fail',
          }
          console.log(ctx.body)
      }

     await next()
  }
}
