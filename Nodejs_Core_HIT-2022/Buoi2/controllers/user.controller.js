const AppError = require('../utils/appError');
const CatchAsync = require('../utils/CatchAsync');
const User = require('../models/user.model');
const {createOne, deleteOne, getAll, getOne, updateOne} = require('./handleFactory');

exports.getAgeOfUser = CatchAsync(async (req,res,next) => { 
    const filter = await User.aggregate([
        {
            $match : {
                age : {
                    $gte : from,
                    $lte : to
                }
            }
        },    
        {
            $project : {
                name : 1,
                age : 1 ,
                email : 1 
            }
        }
        
    ])
    res.status(200).json({
        status : 'success',
        data : {
            users : filter
        }
    })
})

exports.getUser = getOne(User)
exports.getAllUsers = getAll(User)
exports.createUser = createOne(User)
exports.updateUser = updateOne(User)
exports.deleteUser = deleteOne(User)
