
//var databaseJson = require('./petsData');
const Sequelize = require('sequelize');
const User = require('../config/db');
var collectionUrl = User('collectionUrl', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  url: Sequelize.STRING(100),
  name: Sequelize.STRING(100),
});

module.exports = collectionUrl;
