
//var databaseJson = require('./petsData');
const Sequelize = require('sequelize');
const User = require('../config/db');
var videoList = User('videoList', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  userName: Sequelize.STRING(100),
  videoName: Sequelize.STRING(100),
  configHost: Sequelize.STRING(100),
  key: Sequelize.STRING(100),
  token: Sequelize.STRING(1000),
  video: Sequelize.STRING(600),
  thumbUrl: Sequelize.STRING(500),
  fileType: Sequelize.STRING(50),
});

module.exports = videoList;