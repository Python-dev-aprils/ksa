
//var databaseJson = require('./petsData');
const Sequelize = require('sequelize');
const User = require('../config/db');
var Pet = User('pets', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  userName: Sequelize.STRING(100),
  password: Sequelize.STRING(100),
  logErrorNum: Sequelize.STRING(100),
});

module.exports = Pet;