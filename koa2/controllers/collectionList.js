const service = require('../service/collectionList');
var Promise = this.Promise || require('promise');
var agent = require('superagent-promise')(require('superagent'), Promise);
//七牛云
const qiniu = require('qiniu')
const crypto = require('crypto')
const models = require('../models/collectionList');
module.exports = {
    'GET /api/collectionList': async(ctx, next) => {
        await next();
        // var countPerPage = ctx.query.countPerPage,
        //     currentPage = ctx.query.currentPage;
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
            success:true,
            data: collectionListdata
        }
        ctx.response.type = 'application/json';
        ctx.response.body = collection;
    },
    'POST /api/addVideo': async(ctx, next) => {
        await next();
        var p = service.createProduct(ctx.request.body);
        var video = {　　　　
            mes: '请求成功',
            code: 10000,
            success:true,
            data: p
        }
        ctx.response.type = 'application/json';
        ctx.response.body = video;
    }
};
