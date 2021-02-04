const fs = require('fs'); // 图片路径
const path = require('path'); // 图片路径
const mySqlServer = require("../mysql/index.js")
const dirnameImage = path.join(__dirname, '../../shop-files/image') // 存放文件的目录
const jwt = require('jsonwebtoken');
require('dotenv').config()
const { DB_HOST, DB_PORT, PRO_HOST, ENV } = process.env
// 新建文件，可以去百度fs模块
let mkdirs = (dirname, callback) => {
  fs.exists(dirname, function (exists) {
    if (exists) {
      callback()
    } else {
      mkdirs(path.dirname(dirname), function () {
        fs.mkdir(dirname, callback)
      })
    }
  })
}

exports.image = async (ctx, next) => {
  /*
  上传图片
  字段名 file
  */
 //  先获取userId（1）
  let ids = -1
  const token = ctx.request.header.authorization.substring(7)
  if (!token || token == '') {
    ctx.fail('失败', -1)
    return
  }
  jwt.verify(token, 'my_token', (err, authData) => {
   if (!err) {
     ids = authData.id
   } else {
     ids = -1
   }
 })
  // 获取上传单个文件（2）
  const file = ctx.request.files.file // 获取上传文件
  const fileType = file.name.substring(file.name.lastIndexOf('.') + 1) // 获取后缀格式
  const typeName = file.type.substring(0, file.type.lastIndexOf('/')) // 获取文件格式 用于判断
  // 文件信息
  const params = [file.name, file.size, fileType]
  const sql = `insert into file (name,size,type) values (?,?,?)`
  if (typeName != 'image') {
    ctx.fail('文件格式错误，只能上传图片', -1)
    return
   }
  // 把文件信息存储到mysql（先判断目录）（3）
  const images = new Promise((resolve, reject) => {
    if (file) {
      // 先进行判断文件目录是否存在
      fs.access(dirnameImage, async(err) => {
        // 文件和目录不存在的情况下 创建文件目录再执行
        if (err != null && err.code == "ENOENT") {
          console.log("目录不存在")
          fs.mkdir(dirnameImage, async(err) => {
            if (err) {
              console.log('创建目录失败')
            } else {
              const files = await createImage(file)
              if (files.id) {
                onAvatar(files.id).then(res => {
                  if (res != -1) {
                    resolve(files)
                  }
                })
              }
            }
          })
        } else {
          const files = await createImage(file)
          if (files.id) {
            onAvatar(files.id).then(res => {
              if (res != -1) {
                resolve(files)
              }
            })
          }
        }
      })
    } else {
      reject(-1)
    }
  })
  // 把文件存入本地并写入file表 （4）
  function createImage(file) {
    return new Promise(async(resolve, reject) => {
      const res = await mySqlServer.mySql(sql, params)
      // console.log(res.insertId, '数据库id')
      if (res) {
        // 创建可读流
        const reader = fs.createReadStream(file.path)
        let filePath = dirnameImage + `/${file.name}`
        // 创建可写流
        const upStream = fs.createWriteStream(filePath)
        // 可读流通过管道写入可写流
        reader.pipe(upStream)
        // 重命名
        console.log(filePath, dirnameImage + `/${res.insertId}.${fileType}`)
        fs.renameSync(filePath, dirnameImage + `/${res.insertId}.${fileType}`)
        resolve({
          id: res.insertId,
          url: ENV == 'production' ? `http://${PRO_HOST}/image/${res.insertId}.${fileType}` : `http://${DB_HOST}:${DB_PORT}/image/${res.insertId}.${fileType}`
        })
      } else {
        reject(-1)
      }
    })
  }
  // 写入file表后存入user表 （5）
  function onAvatar(avatarId) {
    return new Promise(async(resolve, reject) => {
      const avatarSql = `update shop_user set avatar=${avatarId} where userId = ${ids}`
      const res = await mySqlServer.mySql(avatarSql)
      if (res) {
        resolve(0)
      } else {
        reject(-1)
      }
    })

  }
  // 返回信息 （6）
  const res = await images
  if (res != -1) {
    ctx.success({id: res.id, name: file.name, url: res.url}, '上传成功')
  } else {
    ctx.fail('未知错误', -1)
  }
}