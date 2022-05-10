const ApiError = require('../utils/ApiError')
const CatchAsync = require('../utils/CatchAsync')
const {User} = require('../models')
const jwt = require('jsonwebtoken')


const protect = CatchAsync(async (req,res,next) => {
    let token ;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    } else if(req.cookies.jwt){
        token = req.cookies.jwt
    }
    if(!token) {
        return next(new ApiError('token not exists !',400))
    }
    const decoded = await jwt.verify(token,process.env.JWT_SECRET)
    const freshUser = await User.findOne(decoded._id)
    if(!freshUser) {
        next(new ApiError('the user belonging to this token dose no longer exist',401))
    }
    if(freshUser.changePasswordAfter(decoded.iat)){
        return next(new ApiError('User recently changed password,Please login again',401))
    }
    req.user = freshUser
    next()
})

const restrictTo = (...restrict) =>CatchAsync(async (req,res,next) => {
    if(!restrict.includes(req.user.role)){
        next( new ApiError('you can not access !'),400)
    }
    next()
})


const isLoggedIn = CatchAsync(async (req,res,next) => {
    if(req.cookies.jwt){
        const decoded = await jwt.verify(req.cookies.jwt,process.env.JWT_SECRET)
        const currentUser = await User.findById(decoded.id)
        if(!currentUser) {
            return next()
        }
        if(currentUser.changePasswordAfter(decoded.iat)){
            return next()
        }
        req.session.sessionUser = currentUser
        res.locals.user = currentUser
        return next()
    }
    res.locals.user = null
    req.session.sessionUser = null
    // req.session.destroy();
    next()
})

module.exports = {
    protect,
    restrictTo,
    isLoggedIn
}