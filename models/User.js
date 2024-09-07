const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        unique:true,
        primaryKey:true,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
    },
    username:{
        type:Sequelize.STRING,
        allowNull:false
    }
},{
    freezeTableName: true,
});
module.exports = User;