const formidable = require('koa-formidable'); // 图片处理
const fs = require('fs'); // 图片路径
const path = require('path'); // 图片路径

// 新建文件，可以去百度fs模块
let mkdirs = (dirname, callback)=> {
    fs.exists(dirname, function(exists) {
        if (exists) {
            callback()
        } else {
            mkdirs(path.dirname(dirname), function() {
                fs.mkdir(dirname, callback)
            })
        }
    })
}

exports.image = async (ctx, next) => {
    let form = formidable.parse(ctx.request)
    form((opt, files) => {
        const file = files.files.file // 这里最后的file是前端命名的
        const fields = files.fields
        const filename = file.name
        const buffer = fs.readFileSync(file.path) // 读取文件,此时就可以上传了
        // console.log(filename, buffer) 
        let uploadDir = 'upload/'
        let avatarName = Date.now() + '_' + filename;
        mkdirs('upload', function() {
            fs.renameSync(file.path, uploadDir + avatarName) //重命名
            console.log('http://localhost:3000'+ '/' + uploadDir + avatarName)
        })
    })
}

