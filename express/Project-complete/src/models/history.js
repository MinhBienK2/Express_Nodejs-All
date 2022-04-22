'use strict';

module.exports = (sequelize, DataTypes) => {
    const Histories = sequelize.define('Histories',{
      id : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
        allowNull : false
      },
      patientId: {
        type : DataTypes.UUID,
      },
      doctorId :  DataTypes.UUID,
      description : DataTypes.TEXT,
      files : DataTypes.STRING,
    },{
      tableName : 'Histories',
      timestamps : true,
    })
    return Histories
}

