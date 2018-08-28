
//var databaseJson = require('./petsData');
const Sequelize = require('sequelize');
const User = require('../config/db'); 
var users = User('users', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  isDelete: Sequelize.BIGINT(11),
  userName: Sequelize.STRING(255),
  password: Sequelize.STRING(255),
  iphoneNum: Sequelize.BIGINT(11),
  sessionID: Sequelize.STRING(255),
  logErrorNum: Sequelize.BIGINT(11),
  lastLogErrorTime: Sequelize.DATE(0),
  passwordUpdateDate: Sequelize.DATE(0),
  timestamp: Sequelize.DATE(0),
});

module.exports = users;