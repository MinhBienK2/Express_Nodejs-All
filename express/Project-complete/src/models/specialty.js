'use strict';

module.exports = (sequelize, DataTypes) => {
    const Specialty = sequelize.define('Specialty',{
      id : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
        allowNull : false
      },
      name : DataTypes.STRING,
      description : DataTypes.TEXT,
      image: {
        type : DataTypes.STRING,
      },
    },{
      tableName : 'Specialties',
      timestamps : true,
    })
    return Specialty
}

