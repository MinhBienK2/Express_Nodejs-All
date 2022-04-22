module.exports = (sequelize, DataTypes) => {
    const AllCode = sequelize.define('AllCode',{
        id: {
            type : DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        key : {
            type : DataTypes.STRING,
        },
        type : {
            type : DataTypes.STRING,
        },
        valueEn : {
            type : DataTypes.STRING,
        },
        valueVi : {
            type : DataTypes.STRING,
        }
    },{
        tableName : 'AllCodes',
        timestamps : true
    })
    return AllCode
}