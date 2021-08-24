 /* eslint-disable no-async-promise-executor */
 const model = require("../models/model")
 const Files = model.files.Files // 获取模型
 const path = require('path')
 const fs = require('fs')
 const dirnameImage = path.join(__dirname, '../../shop-files/image') // 存放文件的目录

 require('dotenv').config()
 const { PRO_API, DEV_API } = process.env
 
 // 判断文件目录是否存在 不存在则创建文件夹
 function access(catalog) {
   return new Promise((resolve) => {
     // 目录是否存在
     fs.access(catalog, async(err) => {
       // 文件和目录不存在的情况下 创建文件目录再执行
       if (err != null && err.code == "ENOENT") {
         console.log("目录不存在")
         fs.mkdir(catalog, async(err) => {
           if (err) {
             console.log('创建目录失败')
             resolve(false)
           } else {
             resolve(true)
           }
         })
       } else {
         resolve(true)
       }
     })
   })
   
 }
 
 // 上传图片
 exports.image = async(ctx) => {
   // 获取上传单个文件（2）
   const file = ctx.request.files.file // 获取上传文件

   const fileType = file.name.substring(file.name.lastIndexOf('.') + 1) // 获取后缀格式
   const typeName = file.type.substring(0, file.type.lastIndexOf('/')) // 获取文件格式 用于判断
 
   if (typeName != 'image') {
     ctx.fail('文件格式错误，只能上传图片')
     return
   }
   if (!file) {
     ctx.fail('未上传图片')
   }
   function imagesUpload() {
     return new Promise(async(resolve) => {
       const isAccess = await access(dirnameImage)
       if (isAccess) { // 有目录
         const add_file = await Files.create({ 
           name: file.name,
           size: file.size,
           type: fileType
         })
         if (add_file) {
           const reader = fs.createReadStream(file.path)
           let filePath = dirnameImage + `/${file.name}`
           // 创建可写流
           const upStream = fs.createWriteStream(filePath)
           // 可读流通过管道写入可写流
           reader.pipe(upStream)
           // 重命名
           console.log(filePath, dirnameImage + `/${add_file.id}.${fileType}`)
           fs.renameSync(filePath, dirnameImage + `/${add_file.id}.${fileType}`)
           console.log(add_file)
           // 获取地址
           let url = process.env.NODE_ENV == 'development' ? `${DEV_API}/image/${add_file.id}.${add_file.type}` : `${PRO_API}/image/${add_file.id}.${add_file.type}`
           resolve({
             id: add_file.id,
             url: url
           })
         }
       } else {
         resolve(-1)
       }
     })
   }
   // 返回信息
   const res = await imagesUpload()
   if (res != -1) {
     ctx.success({id: res.id, name: file.name, url: res.url}, '上传成功')
   } else {
     ctx.fail('未知错误', -1)
   }
 }
 