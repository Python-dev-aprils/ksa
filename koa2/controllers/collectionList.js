const service = require('../service/collectionList');
const models = require('../models/collectionList');
module.exports = {
  'POST /api/collectionList': async (ctx, next) => {
    await next();
    var priceMix = ctx.request.body.priceMix,
      priceMax = ctx.request.body.priceMax,
      dateMix = ctx.request.body.dateMix,
      dateMax = ctx.request.body.dateMax
    var collectionListdata = await models.findAndCountAll({
      order: [
        ['id', 'DESC']
      ],
      where: {
        '$and': [{
            'price': {
              '$gte': parseInt(priceMix) || 0,
              '$lte': parseInt(priceMax) || 100000000,
            }
          },
          {
            'createdAt': {
              '$gte': parseInt(dateMix) || 1282975183,
              '$lte': parseInt(dateMax) || 32839883983,
            }
          }
        ]
      }
      // limit: parseInt(countPerPage),
      // offset: parseInt(countPerPage * (currentPage - 1))  // 跳过多少条
    });
    var collection = {　　　　
      mes: '请求成功',
      code: 10000,
      success: true,
      data: collectionListdata
    }
    ctx.response.type = 'application/json';
    ctx.response.body = collection;
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
