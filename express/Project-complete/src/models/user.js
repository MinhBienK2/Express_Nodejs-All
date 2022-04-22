'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',{
      id : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
        allowNull : false
      },
      email: {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
      },
      password : {
        type : DataTypes.STRING,
        allowNull : false
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address : DataTypes.STRING,
      gender : DataTypes.BOOLEAN,
      roleId : DataTypes.STRING,
    },{
      tableName : 'Users',
      timestamps : true,
    })
    return User
}

// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     id : {
//       type : DataTypes.UUID,
//       defaultValue : DataTypes.UUIDV4,
//       primaryKey : true
//     },
//     email: DataTypes.STRING,
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
    
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };

