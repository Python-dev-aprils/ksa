const models = require('../models/users');
//const superagent = require('superagent')
    /*function Product(x) {
        this.data = x;
    }*/
module.exports = {
    createProduct: (x) => {
        async function getData() {
            await models.create(x); //写入数据库
        }
        getData()
        return '创建成功'
    },
    // loginProduct : async (x) =>  {
    //         var userName = {}
    //         userName.updatedAt = Date.now();
    //         userName.version++;
    //         var vilad = await models.findAndCountAll({
    //         where: {
    //             userName: x.userName
    //         },
    //         limit: 1
    //        });
    //        if (vilad.count == 0) {
    //          return '没有此用户！'
    //        }else{
    //          return '登陆成功'
    //        }
    // }
};
