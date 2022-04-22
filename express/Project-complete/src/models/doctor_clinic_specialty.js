'use strict';

module.exports = (sequelize, DataTypes) => {
    const Doctor_clinic_Specialty = sequelize.define('Doctor_clinic_Specialty',{
      id : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
        allowNull : false
      },
      doctorId : {
        type : DataTypes.UUID,
      },
      clinicId: {
        type : DataTypes.UUID,
      },
      specialtyId : {
        type : DataTypes.UUID,
      },
    },{
      tableName : 'Doctor_clinic_Specialty',
      timestamps : true,
    })
    return Doctor_clinic_Specialty
}

