const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-complete','root','phamminhbien123',{
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;