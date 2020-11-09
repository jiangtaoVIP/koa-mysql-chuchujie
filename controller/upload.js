const fs = require('fs'); // 图片路径
const path = require('path'); // 图片路径
const mySqlServer = require("../mysql/index.js")
const dirnameImage = path.join(__dirname, '../upload/image') // 存放文件的目录

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
  // 上传单个文件
  const file = ctx.request.files.file // 获取上传文件
  const fileType = file.name.substring(file.name.lastIndexOf('.') + 1) // 获取后缀格式
  const typeName = file.type.substring(0, file.type.lastIndexOf('/')) // 获取文件格式 用于判断
  if (typeName != 'image') {
    ctx.fail('文件格式错误', -1)
    return
   }
  // 把文件信息存储到mysql
  const params = [file.name, file.size, fileType]
  const sql = `insert into file (name,size,type) values (?,?,?)`
  
  const images = new Promise((resolve, reject) => {
    if (file) {
      // 先进行判断文件目录是否存在
      fs.access(dirnameImage, (err) => {
        // 文件和目录不存在的情况下 创建文件目录再执行
        if (err != null && err.code == "ENOENT") {
          console.log("目录不存在")
          fs.mkdir(dirnameImage, (err) => {
            if (err) {
              console.log('创建目录失败')
            } else {
              resolve(createImage(file))
            }
          })
        } else {
          resolve(createImage(file))
        }
      })
    } else {
      reject(-1)
    }
  })
  const res = await images
  if (res != -1) {
    ctx.success({name: file.name, url: res}, '上传成功')
  } else {
    ctx.fail('未知错误', -1)
  }


  async function createImage(file) {
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
      fs.renameSync(filePath, dirnameImage + `/${res.insertId}.${fileType}`)
      return 'http://localhost:3000/upload/image' + `/${res.insertId}.${fileType}`
    }
  }
}