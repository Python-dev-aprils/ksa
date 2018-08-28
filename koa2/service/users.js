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
    loginProduct: (x) => {
        async function loginData(x) {
            var userName = {}
            userName.updatedAt = Date.now();
            userName.version++;
            await models.findAndCountAll({
            where: {
                userName: x.userName
            },
            limit: 1
           });
        }
        loginData(ids);
    }
};