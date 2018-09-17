
//var databaseJson = require('./petsData');
const Sequelize = require('sequelize');
const User = require('../config/db');
var collectionList = User('collectionListD', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  seller: Sequelize.STRING(100),
  EAN: Sequelize.STRING(100),
  type: Sequelize.STRING(50),
  price: Sequelize.DOUBLE(11, 5),
  amount: Sequelize.INTEGER(100),
  priceDiff: Sequelize.INTEGER(100),
  beforeAmount: Sequelize.INTEGER(100),
  afterAmount: Sequelize.INTEGER(100),
  image_url: Sequelize.STRING(1000),
  fulfilled_by_souq: Sequelize.STRING(600),
  followNum: Sequelize.INTEGER(50),
  reviews_count: Sequelize.INTEGER(50),
});

module.exports = collectionList;
