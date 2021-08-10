/* eslint-disable no-async-promise-executor */
const model = require("../models/model")
const Files = model.files.Files // 获取模型

require('dotenv').config()
const { PRO_API, DEV_API } = process.env

// 传单个id 或者多个id 获取图片地址
exports.getFile = (id) => {
  return new Promise(async(resolve) => {
    if (!id) {
      resolve(id)
      return
    }
    let data = id.split(',')
    let flag = 0
    for (let i = 0; i < data.length; i++) {
      // 不区分是 网络地址还是id了直接查询
      Files.findAll({
        where: {
          id: data[i]
        }
      }).then(res => {
        flag++
        if (res !== undefined && res.length > 0) {
          data[i] = process.env.NODE_ENV == 'development' ? `${DEV_API}/image/${res[0].id}.${res[0].type}` : `${PRO_API}/image/${res[0].id}.${res[0].type}`
        }
        if (flag === data.length) {
          let url = data.join(',')
          resolve(url)
        }
      })
    }
  })
}