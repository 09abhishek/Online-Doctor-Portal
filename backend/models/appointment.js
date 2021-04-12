const Sequelize = require('sequelize');

const sequelize = require('../database');


const Appointment = sequelize.define('appointment', {
  appointment_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull : false,
    primaryKey: true
  },
  appointment_date: {
      type: Sequelize.DATE,
      allowNull : false
    },
    appointment_time: {
      type: Sequelize.TIME,
      allowNull : false
    },
    doctor_id: {
      type: Sequelize.INTEGER,
      allowNull : false
    },
    patient_name: {
      type: Sequelize.STRING,
      allowNull : false
    },
    patient_email: {
      type: Sequelize.STRING
    },
    patient_phone: {
      type: Sequelize.STRING
    },
    appointment_status: {
      type: Sequelize.ENUM,
      values: ['Open', 'Closed', 'Cancelled']
    }
});

module.exports = Appointment;
