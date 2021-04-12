const Sequelize = require('sequelize');

const sequelize = require('../database');

const User = sequelize.define('user', {
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull : false,
    primaryKey: true,
    unique: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull : false
  },
  email: {
    type: Sequelize.STRING,
    allowNull : false
  },
  password: {
    type: Sequelize.INTEGER,
    allowNull : false
  },
  email: {
    type: Sequelize.INTEGER,
    allowNull : false
  }
});

module.exports = User;
