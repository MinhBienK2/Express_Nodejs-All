'use strict';

module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking',{
      id : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
        allowNull : false
      },
      statusId: {
        type : DataTypes.UUID,
      },
      doctorId : {
        type : DataTypes.UUID,
      },
      patientId: {
        type : DataTypes.UUID,
      },
      date: DataTypes.DATE,
      timeType : DataTypes.STRING
    },{
      tableName : 'Bookings',
      timestamps : true,
    })
    return Booking
}

