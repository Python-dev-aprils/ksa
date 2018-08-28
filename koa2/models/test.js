







/*const Sequelize = require('sequelize');
const config = require('../settings');
var co = require('co');//????日后研究
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

 var User = sequelize.define(
    'user',
    {
        'emp_id': {
            'type': Sequelize.CHAR(10), // 字段类型
            'allowNull': false,         // 是否允许为NULL
            'unique': true              // 字段是否UNIQUE
        },
        'nick': {
            'type': Sequelize.CHAR(10),
            'allowNull': false
        },
        'department': {
            'type': Sequelize.STRING(64),
            'allowNull': true
        }
    }
);

var user = User.build({
    'emp_id': '1',
    'nick': '小红',
    'department': '技术部'
});
user = yield user.save();
console.log(user.get({'plain': true}));*/