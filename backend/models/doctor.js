const Sequelize = require('sequelize');

const sequelize = require('../database');

const Doctor = sequelize.define('doctor', {
  doctor_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull : false,
    primaryKey: true
  },
  doctor_name: {
    type: Sequelize.STRING,
    allowNull : false,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull : false
  },
  appointment_slot_time: {
    type: Sequelize.ENUM,
    values: ['15', '30', '45', '60'],
    allowNull : false
  },
  day_start_time: {
    type: Sequelize.TIME,
    allowNull : false
  },
  day_end_time: {
    type: Sequelize.TIME
  }
});

module.exports = Doctor;
