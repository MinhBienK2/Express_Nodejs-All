'use strict';

module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define('Schedule',{
      id : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
        allowNull : false
      },
      currentNumber: {
        type : DataTypes.INTEGER,
      },
      maxNumber : DataTypes.INTEGER,
      date : DataTypes.DATE,
      timeType : DataTypes.STRING,
      doctorId :  DataTypes.UUID,
      
    },{
      tableName : 'Schedules',
      timestamps : true,
    })
    return Schedule
}

