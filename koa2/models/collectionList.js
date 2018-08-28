
//var databaseJson = require('./petsData');
const Sequelize = require('sequelize');
const User = require('../config/db');
var collectionList = User('collectionList', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  seller: Sequelize.STRING(100),
  EAN: Sequelize.STRING(100),
  price: Sequelize.STRING(50),
  amount: Sequelize.STRING(100),
  image_url: Sequelize.STRING(1000),
  handling_time_code: Sequelize.STRING(600),
});

module.exports = collectionList;
