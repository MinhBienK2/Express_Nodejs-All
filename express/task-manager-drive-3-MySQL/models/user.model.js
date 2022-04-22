const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

module.exports = (sequelize,Sequelize) => {
    const User = sequelize.define('User',{
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull:false
        }
    },{
        tableName: 'users',
        timestamps:true,
    })

    User.associate = (models) => {
        User.hasMany(models.product,{
            foreignKey : 'userId',
            as: 'products'
        })
    }
    return User;
}