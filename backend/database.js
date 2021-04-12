const Sequelize = require('sequelize');

const sequelize = new Sequelize('doctors_db', 'root', 'rootpasswordgiven',
  {
    logging: console.log,
    dialect: 'mysql', host: 'localhost', pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 1000
    },
    define: {
      timestamps: false
    }
  },
);


module.exports = sequelize;
