const service = require('../service/collectionList');
const models = require('../models/collectionList');

const Sequelize = require('sequelize');
var sequelize = new Sequelize('ksa', 'test', '12345678', {
  host: '127.0.0.1',
  port: '3306',
  dialect: 'mysql'
});
const serviceD = require('../service/collectionListD');
const modelsD = require('../models/collectionListD');
var fs = require('fs');

function DateDiff(sDate1, sDate2) { //sDate1和sDate2是"2002-12-18"格式
  var aDate, oDate1, oDate2, iDays;
  aDate = sDate1.split("-");
  oDate1 = new Date(aDate[0], aDate[1] - 1, aDate[2]);
  aDate = sDate2.split("-");
  oDate2 = new Date(aDate[0], aDate[1] - 1, aDate[2]);
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
  if ((oDate1 - oDate2) < 0) {
    return -iDays;
  }
  return iDays;
}

function indexOfSmallest(a) { //找出时间最接近最大值
  return a.indexOf(Math.min.apply(Math, a));
}

function unique(arr) {
  let unique = {};
  arr.forEach(function(item) {
    unique[JSON.stringify(item)] = item; //键名不会重复
  })
  arr = Object.keys(unique).map(function(u) {
    //Object.keys()返回对象的所有键值组成的数组，map方法是一个遍历方法，返回遍历结果组成的数组.将unique对象的键名还原成对象数组
    return JSON.parse(u);
  })
  return arr;
}
module.exports = {
  'POST /api/collectionList': async (ctx, next) => {
    await next();
    var priceMix = ctx.request.body.priceMix,
      priceMax = ctx.request.body.priceMax,
      dateMix = ctx.request.body.dateMix,
      dateMax = ctx.request.body.dateMax,
      countPerPage = ctx.request.body.limit,
      currentPage = ctx.request.body.page,
      type = ctx.request.body.type,
      order = ctx.request.body.order,
      prop = ctx.request.body.prop

    let limitObj =   'LIMIT '+parseInt(countPerPage * (currentPage - 1) || 1)+', '+parseInt(countPerPage || 100)+''
    if (order) {
      if (order == "descending") {
        orderData = 'ORDER BY `collectionList`.`'+prop+'` ASC'
      } else if (order == "ascending") {
        orderData = 'ORDER BY `collectionList`.`'+prop+'` DESC'
      }
    } else {
      orderData = 'ORDER BY `collectionList`.`createdAt` DESC'
    }

    if (priceMix && priceMix != "" && priceMix != null && priceMax && priceMax != "" && priceMax != null) {

      priceObj = 'collectionList.price >=' + priceMix + ' and collectionList.price <=' + priceMax

    } else if (priceMix && priceMix != "" && priceMix != null && priceMax == "") {

      priceObj = 'collectionList.price >=' + priceMix

    } else if (priceMax && priceMax != "" && priceMax != null && priceMix == "") {

      priceObj = 'collectionList.price <=' + priceMax

    } else {
      priceObj = ''
    }
    if (dateMix && dateMix != "" && dateMix != null && dateMax && dateMax != "" && dateMax != null) {

      createdAtObj = "collectionList.createdAt >= '" + dateMix + "' and collectionList.createdAt <= '" + dateMax +"'"

    } else if (dateMix && dateMix != "" && dateMix != null && dateMax == "") {

      createdAtObj = "collectionList.createdAt >='" + dateMix+"'"

    } else if (dateMax && dateMax != "" && dateMax != null && dateMix == "") {

      createdAtObj = "collectionList.createdAt <= '" + dateMax+"'"

    } else {
      createdAtObj = ''
    }

    if (type != "" && priceObj != "" && createdAtObj != "") {

      var whereObj = 'where ' + priceObj + ' and collectionList.type = ' + type + ' and ' + createdAtObj

    } else if (type == "" && priceObj != "" && createdAtObj != "") {

      var whereObj = 'where ' + priceObj + ' and ' + createdAtObj

    } else if (type != "" && priceObj == "" && createdAtObj != "") {

      var whereObj = 'where collectionList.type = ' + type + ' and ' + createdAtObj

    } else if (type != "" && priceObj != "" && createdAtObj == "") {

      var whereObj = 'where collectionList.type = ' + type + ' and ' + priceObj

    } else if (type != "" && priceObj == "" && createdAtObj == "") {

      var whereObj = 'where collectionList.type = ' + type

    } else if (type == "" && priceObj != "" && createdAtObj == "") {

      var whereObj = 'where ' + priceObj

    } else if (type == "" && priceObj == "" && createdAtObj != "") {

      var whereObj = 'where ' + createdAtObj

    }

    sqlNum = "select distinct  collectionList.followNum,collectionList.fulfilled_by_souq,collectionList.image_url,collectionList.price,collectionList.reviews_count,collectionList.type,collectionList.seller,collectionList.EAN,collectionList.amount  from  collectionList  " + whereObj + "limit 0,10000"
    var collectionListsqlNum = await sequelize.query(sqlNum, {
      // replacements: [collectionListtotle.rows[getmax].createdAt, collectionListtotle.rows[getmix].createdAt], //按顺序传入需要替换？的值
      type: sequelize.QueryTypes.SELECT
    })

    sqlTotle = "select  distinct  collectionList.followNum,collectionList.fulfilled_by_souq,collectionList.image_url,collectionList.price,collectionList.reviews_count,collectionList.type,collectionList.seller,collectionList.EAN,collectionList.amount,collectionList.createdAt  from  collectionList  "  +" " + whereObj  +" " + orderData +" " +limitObj
      var collectionListdata = await sequelize.query(sqlTotle, {
        // replacements: [collectionListtotle.rows[getmax].createdAt, collectionListtotle.rows[getmix].createdAt], //按顺序传入需要替换？的值
        type: sequelize.QueryTypes.SELECT
      })

    var txtData
    var txtData = fs.readFileSync('../urls.txt', 'utf8')
    var collection = {
      mes: '请求成功',
      code: 10000,
      success: true,
      data: collectionListdata,
      totle : collectionListsqlNum.length
    }
    ctx.response.type = 'application/json';
    ctx.response.body = collection;
  },
  'POST /api/setCollectionListd': async (ctx, next) => {
    await next();
    var priceMix = ctx.request.body.priceMix,
      priceMax = ctx.request.body.priceMax,
      dateMix = ctx.request.body.dateMix,
      dateMax = ctx.request.body.dateMax,
      countPerPage = ctx.request.body.limit,
      currentPage = ctx.request.body.page,
      type = ctx.request.body.type,
      order = ctx.request.body.order,
      prop = ctx.request.body.prop


    // if (order) {
    //   if (order == "descending") {
    //     order = 'asc'
    //   } else if (order == "ascending") {
    //     order = 'DESC'
    //   }
    //   orderData = [
    //     [prop, order]
    //   ]
    // } else {
    //   orderData = [
    //     ['createdAt', 'DESC']
    //   ]
    // }

    if (priceMix && priceMix != "" && priceMix != null && priceMax && priceMax != "" && priceMax != null) {

      priceObj = 'collectionList.price >=' + priceMix + ' and collectionList.price <=' + priceMax

    } else if (priceMix && priceMix != "" && priceMix != null && priceMax == "") {

      priceObj = 'collectionList.price >=' + priceMix

    } else if (priceMax && priceMax != "" && priceMax != null && priceMix == "") {

      priceObj = 'collectionList.price <=' + priceMax

    } else {
      priceObj = ''
    }
    if (dateMix && dateMix != "" && dateMix != null && dateMax && dateMax != "" && dateMax != null) {

      createdAtObj = "collectionList.createdAt >= '" + dateMix + "' and collectionList.createdAt <= '" + dateMax +"'"

    } else if (dateMix && dateMix != "" && dateMix != null && dateMax == "") {

      createdAtObj = "collectionList.createdAt >='" + dateMix+"'"

    } else if (dateMax && dateMax != "" && dateMax != null && dateMix == "") {

      createdAtObj = "collectionList.createdAt <= '" + dateMax+"'"

    } else {
      createdAtObj = ''
    }

    if (type != "" && priceObj != "" && createdAtObj != "") {

      var whereObj = 'where ' + priceObj + ' and collectionList.type = ' + type + ' and ' + createdAtObj

    } else if (type == "" && priceObj != "" && createdAtObj != "") {

      var whereObj = 'where ' + priceObj + ' and ' + createdAtObj

    } else if (type != "" && priceObj == "" && createdAtObj != "") {

      var whereObj = 'where collectionList.type = ' + type + ' and ' + createdAtObj

    } else if (type != "" && priceObj != "" && createdAtObj == "") {

      var whereObj = 'where collectionList.type = ' + type + ' and ' + priceObj

    } else if (type != "" && priceObj == "" && createdAtObj == "") {

      var whereObj = 'where collectionList.type = ' + type

    } else if (type == "" && priceObj != "" && createdAtObj == "") {

      var whereObj = 'where ' + priceObj

    } else if (type == "" && priceObj == "" && createdAtObj != "") {

      var whereObj = 'where ' + createdAtObj

    }

    sqlTotle = "select distinct *  from  collectionList  " + whereObj
      var collectionListtotle = await sequelize.query(sqlTotle, {
        // replacements: [collectionListtotle.rows[getmax].createdAt, collectionListtotle.rows[getmix].createdAt], //按顺序传入需要替换？的值
        type: sequelize.QueryTypes.SELECT
      })


    let arrs = []
    let arrb = []
    collectionListtotle.forEach((item, index, arr) => {
      arrs.push(DateDiff(dateMax, item.createdAt))
      arrb.push(DateDiff(item.createdAt, dateMix))
    })

    let getmax = indexOfSmallest(arrs)
    let getmix = indexOfSmallest(arrb)
          console.log(JSON.stringify('getmaxlist' + getmax))
          console.log(JSON.stringify('getmixlist' + getmix))
    if (getmax != getmix) {



      // "select a.val-b.val as count, a.name from table1 a,table2 b where a.name=b.name"

      let arrDiff = await sequelize.query("select distinct a.amount-b.amount  as priceDiff,b.amount as beforeAmount,a.amount as afterAmount,b.createdAt as beforeCreatedAt,a.createdAt as afterCreatedAt,a.seller,a.EAN,a.type,a.price,a.amount,a.image_url,a.fulfilled_by_souq,a.followNum,a.reviews_count,a.createdAt   from  collectionList a,collectionList b where a.EAN=b.EAN and a.seller=b.seller and a.createDAt=? and b.createDAt=? ", {
        replacements: [collectionListtotle[getmax].createdAt, collectionListtotle[getmix].createdAt], //按顺序传入需要替换？的值
        type: sequelize.QueryTypes.SELECT
      })

      // console.log(JSON.stringify('getmixlist' + getmixlist.length))
      // let getmaxlist = []
      // let getmixlist = []
      // collectionListtotle.rows.forEach((item) => { //找出匹配日期
      //   if (item.createdAt == collectionListtotle.rows[getmax].createdAt) {
      //     getmaxlist.push(item)
      //   }
      //   if (item.createdAt == collectionListtotle.rows[getmix].createdAt) {
      //     getmixlist.push(item)
      //   }
      // })
      //
      // let arrDiff = []
      //
      //       console.log(JSON.stringify('getmaxlist' + getmaxlist.length))
      //       console.log(JSON.stringify('getmixlist' + getmixlist.length))
      // getmaxlist =unique(getmaxlist)
      // getmixlist =unique(getmixlist)
      //
      // console.log(JSON.stringify('getmaxlist' + getmaxlist.length))
      // console.log(JSON.stringify('getmixlist' + getmixlist.length))
      //
      //
      // getmaxlist.forEach((itemmax) => { //找出匹配日期
      //   getmixlist.forEach((itemmix) => { //找出匹配日期
      //     if (itemmax.EAN == itemmix.EAN && itemmax.seller == itemmix.seller) {
      //       //如果相同的数据再去爬取 如何取最新值去计算
      //       let getArrDiffList = {}
      //       getArrDiffList.id = itemmax.id
      //       getArrDiffList.seller = itemmax.seller
      //       getArrDiffList.EAN = itemmax.EAN
      //       getArrDiffList.type = itemmax.type
      //       getArrDiffList.price = itemmax.price
      //       getArrDiffList.amount = itemmax.amount
      //       getArrDiffList.image_url = itemmax.image_url
      //       getArrDiffList.fulfilled_by_souq = itemmax.fulfilled_by_souq
      //       getArrDiffList.followNum = itemmax.followNum
      //       getArrDiffList.reviews_count = itemmax.reviews_count
      //       getArrDiffList.priceDiff = parseFloat(itemmix.amount - itemmax.amount)
      //       getArrDiffList.beforeAmount = itemmix.amount
      //       getArrDiffList.afterAmount = itemmax.amount
      //       getArrDiffList.beforeCreatedAt = itemmix.createdAt
      //       getArrDiffList.afterCreatedAt = itemmax.createdAt
      //       getArrDiffList.createdAt = itemmax.createdAt
      //       arrDiff.push(getArrDiffList)
      //     }
      //
      //   })
      // })

      // var num = await modelsD.findAndCountAll({
      //   'attributes': ['seller', 'EAN', 'type', 'price', 'amount', 'priceDiff', 'beforeAmount', 'afterAmount', 'image_url', 'fulfilled_by_souq', 'followNum', 'reviews_count', 'createdAt'],
      //   order: orderData
      // });
      // console.log(num.rows.length)
      // if (num.rows.length > 0) {
      //   var dodel = await modelsD.destroy({
      //     'where': {
      //       '$not': [{
      //         'id': null
      //       }]
      //     }
      //   });
      // }

      for (var i in arrDiff) {
        var p = serviceD.createProduct(arrDiff[i]);
      }
      var collection = {
        mes: '获取最新数据成功',
        code: 10000,
        success: true,
      }
      ctx.response.type = 'application/json';
      ctx.response.body = collection;

    } else {
      if (dateMix != "" && dateMax != "") {
        var collection = {
          mes: '暂无可比对数据！',
          code: 10000,
          success: true,
        }
        ctx.response.type = 'application/json';
        ctx.response.body = collection;
      }
    }
  },
  'POST /api/collectionListd': async (ctx, next) => {
    await next();
    var priceMix = ctx.request.body.priceMix,
      priceMax = ctx.request.body.priceMax,
      dateMix = ctx.request.body.dateMix,
      dateMax = ctx.request.body.dateMax,
      countPerPage = ctx.request.body.limit,
      currentPage = ctx.request.body.page,
      type = ctx.request.body.type,
      order = ctx.request.body.order,
      prop = ctx.request.body.prop



    if (order) {
      if (order == "descending") {
        order = 'asc'
      } else if (order == "ascending") {
        order = 'DESC'
      }
      orderData = [
        [prop, order]
      ]
    } else {
      orderData = [
        ['createdAt', 'DESC']
      ]
    }
    if (priceMix && priceMix != "" && priceMix != null && priceMax && priceMax != "" && priceMax != null) {
      priceObj = {
        '$gte': priceMix,
        '$lte': priceMax,
      }
    } else if (priceMix && priceMix != "" && priceMix != null && priceMax == "") {
      priceObj = {
        '$gte': priceMix
      }
    } else if (priceMax && priceMax != "" && priceMax != null && priceMix == "") {
      priceObj = {
        '$lte': priceMax
      }
    } else {
      priceObj = ''
    }
    if (dateMix && dateMix != "" && dateMix != null && dateMax && dateMax != "" && dateMax != null) {
      createdAtObj = {
        '$gte': dateMix,
        '$lte': dateMax,
      }
    } else if (dateMix && dateMix != "" && dateMix != null && dateMax == "") {
      createdAtObj = {
        '$gte': dateMix
      }
    } else if (dateMax && dateMax != "" && dateMax != null && dateMix == "") {
      createdAtObj = {
        '$lte': dateMax
      }
    } else {
      createdAtObj = ''
    }

    if (type != "" && priceObj != "" && createdAtObj != "") {
      var whereObj = {
        '$and': [{
            'price': priceObj
          },
          {
            'type': type
          },
          {
            'createdAt': createdAtObj
          }
        ]
      }
    } else if (type == "" && priceObj != "" && createdAtObj != "") {
      var whereObj = {
        '$and': [{
            'price': priceObj
          },
          {
            'createdAt': createdAtObj
          }
        ]
      }
    } else if (type != "" && priceObj == "" && createdAtObj != "") {
      var whereObj = {
        '$and': [{
            'type': type
          },
          {
            'createdAt': createdAtObj
          }
        ]
      }
    } else if (type != "" && priceObj != "" && createdAtObj == "") {
      var whereObj = {
        '$and': [{
            'type': type
          },
          {
            'price': priceObj
          }
        ]
      }
    } else if (type != "" && priceObj == "" && createdAtObj == "") {
      var whereObj = {
        'type': type
      }
    } else if (type == "" && priceObj != "" && createdAtObj == "") {
      var whereObj = {
        'price': priceObj
      }
    } else if (type == "" && priceObj == "" && createdAtObj != "") {
      var whereObj = {
        'createdAt': createdAtObj
      }
    } else if (type == "" && priceObj == "" && createdAtObj == "") {
      var whereObj = {
        '$not': [{
          'id': null
        }]
      }
    }


    var collectionListdata = await modelsD.findAndCountAll({
      'attributes': [
        [Sequelize.literal('distinct `id`'), 'id'], 'seller', 'EAN', 'type', 'price', 'amount', 'priceDiff', 'beforeAmount', 'afterAmount', 'image_url', 'fulfilled_by_souq', 'followNum', 'reviews_count', 'createdAt'
      ],
      order: orderData,
      where: whereObj,
      limit: parseInt(countPerPage || 100),
      offset: parseInt(countPerPage * (currentPage - 1) || 1) // 跳过多少条
    });
    var collection = {
      mes: '更新成功',
      code: 10000,
      success: true,
      data: collectionListdata,
    }

    ctx.response.type = 'application/json';
    ctx.response.body = collection;

  },
  'GET /api/typeList': async (ctx, next) => {
    await next();
    var txtData
    var txtData = fs.readFileSync('../urls.txt', 'utf8')
    var video = {　　　　
      mes: '请求成功',
      success: true,
      txtData: txtData
    }
    ctx.response.type = 'application/json';
    ctx.response.body = video;
  },
  'POST /api/collectionListadd': async (ctx, next) => {
    await next();
    var p = service.createProduct(ctx.request.body);
    var video = {　　　　
      mes: '请求成功',
      code: 10000,
      success: true,
      data: p
    }
    ctx.response.type = 'application/json';
    ctx.response.body = video;
  },

};
