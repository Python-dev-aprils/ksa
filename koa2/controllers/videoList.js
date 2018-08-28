const service = require('../service/videoList');
var Promise = this.Promise || require('promise');
var agent = require('superagent-promise')(require('superagent'), Promise);
//七牛云
const qiniu = require('qiniu')
const crypto = require('crypto')
const models = require('../models/videoList');
module.exports = {
    'GET /api/token': async(ctx, next) => {
        await next();
        //构建一个保存文件名
        //这里没有处理文件后缀,需要自己传递过来,然后在这里处理加在key上,非必须
        const key = crypto.createHash('md5').update(((new Date()) * 1 + Math.floor(Math.random() * 10).toString())).digest('hex')
        const name = '禾禾'
        var accessKey = 'd5gP4PXU2P-6F08mplA9c9NlHGoo5Ff5vPxZlvKn';
        var secretKey = 'ZTscE9Lw4MeO5W893_dr8kIW8J3tNYM2_PVuEFnA';
        var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        var config = new qiniu.conf.Config();
        config.zone = qiniu.zone.Zone_z2;
        config.useCdnDomain = true;
        var options = {
            scope: 'gbeniot',
            returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(name)","persistentId":"$(persistentId)"}',
            persistentOps: "vframe/jpg/offset/1/w/480/h/360",
            persistentNotifyUrl: "http://77g1mh.com1.z0.glb.clouddn.com/qiniu/pfop/notify"
        };
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var uploadToken = putPolicy.uploadToken(mac);

        ctx.response.type = 'application/json';
        ctx.response.body = {
            key: key,
            token: uploadToken,
            config: config,
        };
    },
    'GET /api/videoList': async(ctx, next) => {
        await next();
        var countPerPage = ctx.query.countPerPage,
            currentPage = ctx.query.currentPage;
        var videoListdata = await models.findAndCountAll({
            order: [
                ['id', 'DESC']
            ],
            limit: parseInt(countPerPage), 
            offset: parseInt(countPerPage * (currentPage - 1))  // 跳过多少条 
        });
 /*       console.log(videoListdata.count)
        console.log(videoList.count)*/
        var video = {　　　　
            mes: '请求成功',
            code: 10000,
            count : videoListdata.count,
            data: videoListdata.rows
        }
        ctx.response.type = 'application/json';
        ctx.response.body = video;
    },
    'POST /api/addVideo': async(ctx, next) => {
        await next();
        var p = service.createProduct(ctx.request.body);
        var video = {　　　　
            mes: '请求成功',
            code: 10000,
            data: p
        }
        ctx.response.type = 'application/json';
        ctx.response.body = video;
    }
};