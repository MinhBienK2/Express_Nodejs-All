const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('Product', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.DOUBLE,
            allowNull:false
        },
    },{
        tableName : 'Products',
        timestamps: true,
    })
    Product.associate = (models) => {
        Product.belongsTo(models.user,{
            foreignKey: 'userId',
            onDelete: "CASCADE"
        })
    }
    return Product;
}
