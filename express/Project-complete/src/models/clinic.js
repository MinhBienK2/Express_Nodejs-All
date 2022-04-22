'use strict';

module.exports = (sequelize, DataTypes) => {
    const Clinic = sequelize.define('Clinic',{
      id : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
        allowNull : false
      },
      name : {
        type : DataTypes.STRING,
        allowNull : false
      },
      address: {
        type : DataTypes.STRING,
      },
      description : DataTypes.TEXT,
      image : DataTypes.STRING
    },{
      tableName : 'Clinics',
      timestamps : true,
    })
    return Clinic
}

