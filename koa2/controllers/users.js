const service = require('../service/users');
var Promise = this.Promise || require('promise');
const models = require('../models/users'); //引入数据模型，可自动生成对应数据库表 gyx.sync({force: true});
module.exports = {
  'POST /api/user/add': async (ctx, next) => {
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
  'POST /api/user/login': async (ctx, next) => {
    await next();
    var vilad = await models.findAndCountAll({
      where: {
        userName: ctx.request.body.userName
      },
      limit: 1
    });

    var mes, success,userdata
    if (vilad.count == 0) {
      mes = '未注册该用户！',
        success = false
    } else {
      var vilad2 = await models.findAndCountAll({
        where: {
          '$and': [{
              userName: ctx.request.body.userName
            },
            {
              password: ctx.request.body.password
            }
          ]
        },
        limit: 1
      });
      // console.log(JSON.stringify(vilad2))
      if (vilad2.count >= 1) {
          mes = '登录成功',
          success = true,
          userdata = vilad2
      } else {
        mes = '密码不正确，请重新输入！',
          success = false
      }
    }
    var users_sss = {
      data :userdata,
      mes: mes,
      code: 10000,
      success: success,
    }
    ctx.response.type = 'application/json';
    ctx.response.body = users_sss;
  },
  'PUT /api/user/resetPwd/:id': async (ctx, next) => {
    await next();
    // console.log(JSON.stringify('1'+JSON.stringify(ctx.params)))
    // console.log(JSON.stringify('2'+JSON.stringify(ctx.request.body)))
    let obj = {}
    obj.password = ctx.request.body.newPassword
    // obj.userName = 'gyx'
    var vilad = await models.findAndCountAll({
      where: {
        '$and': [{
            id: ctx.params.id
          },
          {
            password: ctx.request.body.password
          }
        ]
      },
      limit: 1
    });
    var mes, success
    if (vilad.count >= 1) {
        await models.update(obj, {
          where: {
            id: ctx.params.id
          }
        });
        mes = '修改密码成功！'
        success = true
    }else{
      mes = '密码输入错误！'
      success = false
    }

    var users_sss = {
      mes: mes,
      success : success
    }
    ctx.body = users_sss;

  },
};
