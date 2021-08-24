function parseDate(data) { // 转换13位时间戳
  if (data instanceof  Array) {
    data.forEach(item => {
      if (item.createTime) {
        item.createTime = Date.parse(item.createTime)
      }
      if (item.updateTime) {
        item.updateTime = Date.parse(item.updateTime)
      }
    })
  } else if (data instanceof Object) {
    if (data.createTime) {
      data.createTime = Date.parse(data.createTime)
    }
    if (data.updateTime) {
      data.updateTime = Date.parse(data.updateTime)
    }
    if (data.list !== undefined && data.list.length > 0) {
      data.list.forEach(item => {
        if (item.createTime) {
          item.createTime = Date.parse(item.createTime)
        }
        if (item.updateTime) {
          item.updateTime = Date.parse(item.updateTime)
        }
      })
    }
  } else {
    return data
  }
  return data
}

module.exports =  function routerResponse(option={}){
  return async function(ctx,next){
      ctx.success = function (data,msg) {
        data = parseDate(data)
          ctx.type = option.type || 'json'
          ctx.body = {
            code : option.successCode || 0,
            msg : msg || '成功',
            data : data ? data : undefined
          }
      }

      ctx.fail = function (msg,code) {
          ctx.type = option.type || 'json'
          ctx.body = {
              code : code || option.failCode || -1,
              msg : msg || option.successMsg || '失败',
          }
          console.log(ctx.body)
      }

     await next()
  }
}
