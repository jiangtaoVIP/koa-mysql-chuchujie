const jwt = require('../model/tokenFn')
const mySqlServer = require("../mysql/index.js")
exports.getList = async(ctx) => {
  const userId = jwt.verify(ctx.header)
  if (!userId || userId == -1) {
    ctx.fail('参数错误', -1)
    return
  }
  function goodsList (arr) {
    return new Promise(async (resolve, reject) => {
      const promise = arr.map(item => mySqlServer.mySql(`select * from goodsdetails where id = ${item.goodsId}`))
      const promise_two = arr.map(item => mySqlServer.mySql(`select * from goodsdetails_list where id = ${item.listId}`))
      let all = await Promise.all(promise)
      let all_two = await Promise.all(promise_two)
      if (all.length > 0 && all_two.length > 0) {
        function deWeight() {
          for (var i = 0; i < all.length - 1; i++) {
              for (var j = i + 1; j < all.length; j++) {
                  if (all[i].id == all[j].id) {
                    all.splice(j, 1) //因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
                    j++
                  }
              }
          }
          return all;
      }
      var newArr = deWeight()
      console.log(newArr)
      }
      resolve()
    })
  }

  const res = await mySqlServer.mySql(`select * from shopcart where userId = ${userId}`)
  if (res !== undefined && res.length > 0) {
    const result = await Promise.all([goodsList(res)])
    ctx.success(res, '成功')
  } else {
    ctx.fail('失败', -1)
  }
}