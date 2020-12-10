const mySqlServer = require("../mysql/index.js")
const { getFile } = require('../model/getfile')

exports.getDetails = async(ctx) => {
  const data = ctx.request.body
  if (!data.adminId) {
    ctx.fail('参数错误', -1)
    return
  }
  const sql = `select * from admin_user where id = ${data.adminId}`
  const res = await mySqlServer.mySql(sql)
  if (res) {
    res[0].avatar = await getFile(res[0].avatar)
    let data = res[0]
    const all = {
      id: data.id,
      userName: data.userName,
      phone: data.phone,
      avatar: data.avatar,
      descText: data.descText,
      createTime: data.createTime,
      updateTime: data.updateTime
    }
    ctx.success(all, '成功')
  } else {
    ctx.fail('失败', -1)
  }
}