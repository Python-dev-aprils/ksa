const models = require('../models/collectionList');
//const superagent = require('superagent')
    /*function Product(x) {
        this.data = x;
    }*/
module.exports = {
    createProduct: (x) => {
        var p = x;
        console.log(p)
        async function getData() {
            await models.create(p); //写入数据库
        }
        getData();
        return p;
    },
    upProduct: (ids) => {
        async function upData(ids) {
            console.log(ids)
            var userName = {}
            userName.updatedAt = Date.now();
            userName.version++;
            await models.update(userName, {
                where: {
                    id: ids
                }
            });
        }
        upData(ids);
    },
    delProduct: (ids) => {
        async function delData(ids) {
            await models.destroy({
                where: {
                    id: ids
                }
            });
        }
        delData(ids);
    }
};
