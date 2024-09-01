const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Cart = sequelize.define('cart_table',{
  id:{
    type: Sequelize.INTEGER,
    allowNull:false,
    primaryKey:true,
  },
  qty:{
    type:Sequelize.INTEGER,
    defaultValue:1,
  }
},{
  freezeTableName: true,
});
module.exports = Cart;