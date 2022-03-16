const CatchAsync = require('../utils/CatchAsync')
const AppError = require('../utils/AppError')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

exports.protect = CatchAsync(async (req, res, next) => {
    const token = req.headers.authorization.replace('Bearer ','')
    if(!token) {
        return next(new AppError('You are not logged in',401))
    }
    const recode =await jwt.verify(token,process.env.JWT_SECRET)
    const user = await User.findOne({_id:recode.id})
    if(!user) {
        return next(new AppError('User not found id',401))
    }
    req.user = user
    // console.log(res.user)
    next()
})

exports.reStrictTo = (...roles) => {
    return (req, res, next) => {
        console.log(req.user.id)
        const role = req.user.role
        if(!roles.includes(role)){
            return next(new AppError('You dont have permission to access this route',403))
        }
        next()
    }
}