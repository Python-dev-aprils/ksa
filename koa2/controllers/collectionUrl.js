const service = require('../service/collectionUrl');
const models = require('../models/collectionUrl');
var fs = require('fs');
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
    // appendFile
    fs.writeFile('../urls.txt', JSON.stringify(collection.data.rows),function(err){
        if(err) console.log('写文件操作失败');
        else console.log('写文件操作成功');
    });
    ctx.response.type = 'application/json';
    ctx.response.body = collection;
  },
  'POST /api/collectionUrlAdd': async (ctx, next) => {
    await next();
    console.log(ctx.request.body)
        //异步方法
    var p = service.createProduct(ctx.request.body);
    var video = {　　　　
      mes: '新增成功',
      code: 10000,
      success: true
    }
    ctx.response.type = 'application/json';
    ctx.response.body = video;
  },
  'DELETE /api/collectionUrl/:id': async (ctx, next) => {
    await next();
    service.delProduct(ctx.params.id);
    var users_sss = {
      mes: '删除成功',
      code: 10000,
      success: true
    }
    ctx.response.type = 'application/json';
    ctx.response.body = users_sss;
  },
};
