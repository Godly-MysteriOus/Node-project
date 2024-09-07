const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const CartItem = sequelize.define('cartitem',{
  id:{
    type: Sequelize.INTEGER,
    allowNull:false,
    primaryKey:true,
    autoIncrement:true
  },
  qty:{
    type:Sequelize.INTEGER,
    default:1,
  }
},{
  freezeTableName: true,
});
module.exports = CartItem;