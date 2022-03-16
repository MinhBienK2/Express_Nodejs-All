const User = require('../src/models/user')
const CatchAsync = require('../utils/CatchAsync')
const handleFactory = require('./hadleFactory.controller')

const filterProperties = function (obj, ...allowed) {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if(allowed.includes(el))
            newObj[el] = obj[el]
    })
    return newObj
}

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id
    next()
}

exports.updateMe = CatchAsync(async (req,res,next) => {
    if(req.body.password || req.body.passwordConfirm) 
        return next(
            new AppError(
                'This route is not for password update. Please use /updateMyPassword',
                400
            ))
    const user = await User.findByIdAndUpdate(req.user.id,filterProperties(req.body,"name","email"),{
        new : true,
        runValidators : true
    })
    res.status(200).json({
        status : 'success',
        data : {
            user
        }
    })
})

exports.deleteMe = CatchAsync(async (req,res,next) => {
    await User.findByIdAndUpdate(req.user.id,{active : false})
    res.status(204).json({
        status : 'success',
        data : null
    })
})

exports.createUser = CatchAsync(async (req,res) => {
    res.status(500).json({
        status : 'error',
        message : 'This route is not defined. Please use /signup'
    })
})

exports.getAllUsers = handleFactory.getAllDocument(User)
exports.getUser    = handleFactory.getOne(User)
// do not update passwords with this
exports.updateUser = handleFactory.updateOne(User)
exports.deleteUser = handleFactory.deleteOne(User)