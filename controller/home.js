// const mySqlServer = require("../mysql/index.js")
require('dotenv').config()
const { DB_HOST, DB_PORT, ENV, PRO_HOST } = process.env

const model = require('../models/model')
const Message = model.message.Message //获取模型
const MyGoods = model.goodsdetails.MyGoods //获取模型
const CategoryTwo = model.categoryTwo.CategoryTwo //获取模型

const { Op } = require("sequelize") // 操作符
const { sequelize } = require("../config/db")
const { getFile } = require('../models/getfile')
exports.getData = async (ctx, next) => {
  // const forImage = new Promise(async(resolve, reject) => {
  //   // 随机获取5条 商品数据
  //   const sql = `select * from goodsdetails order by rand() limit 5`
  //   const res = await mySqlServer.mySql(sql)
  //   if (res && res.length > 0) {
  //     res.forEach(item => {
  //       if (item.homeImageIds) {
  //         item.homeImageIds = item.homeImageIds.split(',').filter(item => item !== '')
  //       } else {
  //         item.homeImageIds = []
  //       }
  //       data['forImageList'].push({
  //         id: item.id,
  //         name: item.name,
  //         parentId: item.parentId,
  //         homeImageIds: item.homeImageIds[0]
  //       })
  //     })
  //     resolve(res)
  //   }
  // })
  // const forCategory = new Promise(async (resolve) => {
  //   // 随机获取4条二级分类数据
  //   const sql = `select * from category_two order by rand() limit 6`
  //   const res = await mySqlServer.mySql(sql)
  //   if (res && res.length > 0) {
  //     const promise = res.map(v => mySqlServer.mySql(`select * from file where id=${v.icon}`))
  //     let all = await Promise.all(promise)
  //     if (all.length > 0) {
  //       res.forEach(item => {
  //         all.forEach(it => {
  //           if (item.icon == it[0].id) {
  //             item.icon = ENV == 'production' ? `http://${PRO_HOST}/image/${it[0].id}.${it[0].type}` : `http://${DB_HOST}:${DB_PORT}/image/${it[0].id}.${it[0].type}`
  //           }
  //         })
  //       })
  //       data.forCategoryList = res
  //       resolve(res)
  //     }
  //   }
  // })
  // const forGoosList = new Promise(async (resolve) => {
  //   // 随机获取4条商品数据列表
  //   const sql = `select * from goodsdetails order by rand() limit 4`
  //   const res = await mySqlServer.mySql(sql)
  //   if (res && res.length > 0) {
  //     // const promise = res.map(b => mySqlServer.mySql(`select * from goodsdetails_sku where parentId = ${b.id}`))
  //     // const skus = await Promise.all(promise)
  //     // const promiseTwo = res.map(b => mySqlServer.mySql(`select * from goodsdetails_type where parentId = ${b.id}`))
  //     // const types = await Promise.all(promiseTwo)
  //     // const detailsSku = deleteArr(skus)
  //     // const detailsType = deleteArr(types)
  //     // res.forEach(item => {
  //     //   item['skus'] = []
  //     //   item['types'] = []
  //     //   detailsSku.forEach((sku, index) => {
  //     //     sku.forEach(it => {
  //     //       if (item.id == it.parentId) {
  //     //         item.skus.push(it)
  //     //       }
  //     //     })
  //     //   })
  //     //   detailsType.forEach(type => {
  //     //     type.forEach(it => {
  //     //       if (item.id == it.parentId) {
  //     //         item.types.push(it)
  //     //       }
  //     //     })
  //     //   })
  //     // })
  //     data.forGoodsList = res
  //     resolve(res)
  //   }
  // })
  // const forMessage = new Promise(async (resolve) => {
  //   // 随机获取1条通知
  //   const sql = `select * from message order by rand() limit 1`
  //   const res = await mySqlServer.mySql(sql)
  //   if (res && res.length > 0) {
  //     data.message = res[0]
  //     resolve(res)
  //   }
  // })

  function goodsList() { // 首页中部随机推荐
    return new Promise(async(resolve) => {
      const res = await MyGoods.findAll({
        order: sequelize.random(),
        limit: 4
      })
      if (res.length > 0) {
        let flag = 0
        for (let i = 0; i < res.length; i++) {
          await getFile(res[i].iconId).then(re => { // 获取图片
            res[i].iconId = re
            flag++
            if (flag === res.length) {
              resolve(res)
            }
          })
        }
      } else {
        resolve(res)
      }
    })
  }
  function categoryList() { // 首页分类随机
    return new Promise(async(resolve) => {
      const res = await CategoryTwo.findAll({
        order: sequelize.random(),
        limit: 6
      })
      if (res.length > 0) {
        let flag = 0
        for (let i = 0; i < res.length; i++) {
          await getFile(res[i].icon).then(re => { // 获取图片
            res[i].icon = re
            flag++
            if (flag === res.length) {
              resolve(res)
            }
          })
        }
      } else {
        resolve(res)
      }
    })
  }
  function imageList() { // 首页商品轮播
    return new Promise(async(resolve) => {
      const res = await MyGoods.findAll({
        order: sequelize.random(),
        limit: 5
      })
      if (res.length > 0) {
        let flag = 0
        for (let i = 0; i < res.length; i++) {
          await getFile(res[i].homeImageIds).then(re => { // 获取图片
            res[i].homeImageIds = re.split(',').filter(item => item !== '')
            res[i].homeImageIds = res[i].homeImageIds[0] // 只需要获取一张即可
            flag++
            if (flag === res.length) {
              resolve(res)
            }
          })
        }
      } else {
        resolve(res)
      }
    })
  }
  function message() { // 随机获取1条通知
    return new Promise(async(resolve) => {
      const res = await Message.findOne({
        where: { isShow: true },
        order: sequelize.random()
      })
      resolve(res)
      console.log('消息通知')
    })
  }
  const data = {
    message: null, // 首页通知
    forImageList: [], // 首页商品轮播
    forCategoryList: [], //  首页分类
    forGoodsList: [] // 商品中部随机推荐
  }

  const result = await Promise.all([message(), imageList(), categoryList(), goodsList()])
  if (result.length === 4) {
    data.message = result[0] // 消息通知
    data.forImageList = result[1] // 首页商品轮播
    data.forCategoryList = result[2] // 首页分类
    data.forGoodsList = result[3] // 首页中部随机推荐
    ctx.success(data, '成功')
  } else {
    ctx.fail('失败', -1)
  }
}
exports.goodsList = async (ctx, next) => {
  const { page, size} = ctx.request.body
  if (!page || !size) {
    ctx.fail('参数错误', -1)
    return
  }
  // const body = {
  //   page: 0,
  //   size: 0,
  //   pageNum: 0,
  //   total: 0,
  //   list: []
  // }
  // const forGoods = new Promise(async(resolve) => {
  //   // 获取 所有商品列表（分页处理）
  //   // select count(*) from (select * from t2 limit 1) a
  //   const sql = `select count(*) from goodsdetails order by updateTime desc`
  //   const res = await mySqlServer.mySql(sql)
  //   if (res && res.length > 0) {
  //     const total = res[0]['count(*)']
  //     body.total = total // 总页数
  //     body.pageNum = Math.trunc((total + (size -1) )/size) // 分页数量
  //   }
  //   resolve(res)
  // })
  // const goodsList = new Promise(async (resolve) => {
  //   // 按最新时间 分页查询
  //   const sql = `select * from goodsdetails order by updateTime desc limit ${(page-1)*size},${size}`
  //   const res = await mySqlServer.mySql(sql)
  //   if (res && res.length > 0) {
  //     // const promise = res.map(b => mySqlServer.mySql(`select * from goodsdetails_sku where parentId = ${b.id}`))
  //     // const skus = await Promise.all(promise)
  //     // const promiseTwo = res.map(b => mySqlServer.mySql(`select * from goodsdetails_type where parentId = ${b.id}`))
  //     // const types = await Promise.all(promiseTwo)
  //     // const detailsSku = deleteArr(skus)
  //     // const detailsType = deleteArr(types)
  //     // res.forEach(item => {
  //     //   item['skus'] = []
  //     //   item['types'] = []
  //     //   detailsSku.forEach((sku, index) => {
  //     //     sku.forEach(it => {
  //     //       if (item.id == it.parentId) {
  //     //         item.skus.push(it)
  //     //       }
  //     //     })
  //     //   })
  //     //   detailsType.forEach(type => {
  //     //     type.forEach(it => {
  //     //       if (item.id == it.parentId) {
  //     //         item.types.push(it)
  //     //       }
  //     //     })
  //     //   })
  //     // })
  //     body.list = res // 数据
  //   }
  //   body.page = parseInt(page) // 页码
  //   body.size = parseInt(size) // 页数
  //   resolve()
  // })

  function allFn() {
    return new Promise(async(resolve) => {
      const res = await MyGoods.findAndCountAll({
        order: [['updateTime', 'DESC']],
        offset: (page-1) * size,
        limit: parseInt(size)
      })
      if (res) {
        if (res.rows.length > 0) {
          res.rows.forEach(item => {
            item.none_sku = item.none_sku === 1
          })
        }
        resolve(res)
      }
    })
  }
  const res = await allFn()
  if (res) {
    ctx.success({
      total: res.count, // 总页数
      pageNum: Math.trunc((res.count + (size -1) )/size), // 分页数量
      page: parseInt(page), // 页码
      size: parseInt(size), // 页数
      list: res.rows
    })
  }
}

function deleteArr(list) {
  list.forEach((item, index) => {
    if (item.length === 0) {
      list.splice(index, 1)
    }
  })
  return list
}
