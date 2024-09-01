const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define('product_table',{
  id:{
    type: Sequelize.INTEGER,
    allowNull:false,
    autoIncrement: true,
    primaryKey: true,
  },
  title:{
    type: Sequelize.STRING,
    allowNull:false,
  },
  price:{
    type: Sequelize.DOUBLE,
    allowNull:false
  },
  imageUrl:{
    type: Sequelize.STRING,
    allowNull:false
  },
  description:{
    type: Sequelize.STRING,
    allowNull:false
  }
},{
  freezeTableName: true,
});

module.exports = Product;


