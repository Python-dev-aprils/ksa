const service = require('../service/users');
var Promise = this.Promise || require('promise');
const models = require('../models/users'); //引入数据模型，可自动生成对应数据库表 gyx.sync({force: true});
module.exports = {
    'POST /api/user/add': async(ctx, next) => {
        await next();
        var userMsgData = ctx.request.body.userMsg;
        console.log(userMsgData)
        var vilad = await models.findAndCountAll({
            where: {
                userName: userMsgData.userName
            }
        });
        console.log(vilad.count)
        if (vilad.count == 0) {
            userMsgData.isDelete = 0;
            userMsgData.sessionID = 0;
            userMsgData.logErrorNum = 0;
            userMsgData.lastLogErrorTime = Date.now();
            userMsgData.passwordUpdateDate = Date.now();
            userMsgData.timestamp = Date.now();
            mes = service.createProduct(userMsgData);
        } else {
            var mes = '用户名已存在！'
        }
        var users_sss = {　　　　
            mes: mes,
            code: 10000,
        }
        ctx.response.type = 'application/json';
        ctx.response.body = users_sss;
    },
    'POST /api/user/login': async(ctx, next) => {
        await next();
        var p = service.loginProduct(ctx.request.body);
        var users_sss = {　　　　
            mes: 'success',
            code: 10000,
            data: p
        }
        ctx.response.type = 'application/json';
        ctx.response.body = users_sss;
    },
};