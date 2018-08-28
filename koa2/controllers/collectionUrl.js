const service = require('../service/collectionUrl');
const models = require('../models/collectionUrl');
module.exports = {

  'POST /api/collectionUrl': async (ctx, next) => {
    await next();
    var collectionListdata = await models.findAndCountAll({
      order: [
        ['id', 'DESC']
      ],
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
  'POST /api/collectionUrlAdd': async (ctx, next) => {
    await next();
    console.log(ctx.request.body)
    var p = service.createProduct(ctx.request.body);
    var video = {　　　　
      mes: '新增成功',
      code: 10000,
      success: true
    }
    ctx.response.type = 'application/json';
    ctx.response.body = video;
  }
};
