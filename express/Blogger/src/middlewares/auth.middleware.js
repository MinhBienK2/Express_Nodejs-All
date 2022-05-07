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
    const decoded = await jwt.verify(token,process.env.JWT_SECURE)
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


const isLoggedIn = async (req,res,next) => {
    try{
        if(req.cookies.jwt){
            try{
                const decoded = await jwt.verify(req.cookies.jwt,process.env.JWT_SECRET)
                const currentUser = await User.findById(decoded._id)
                if(!currentUser) {
                    res.redirect('login')
                    return
                }
                if(currentUser.changePasswordAfter(decoded.iat)){
                    res.redirect('login')
                    return 
                }
                res.locals.user = currentUser
                next()
            } catch(err){
                return next()
            }
        }
        res.redirect('/login')
        return
    }catch(err){
        console.log(err)
    }
}

const logout = CatchAsync(async (req,res,next) => {
    res.cookie('jwt','loggedout',{
        expires : new Date(Date.now() + 10 * 1000),
        httpOnly : true
    })
    res.status(200).json({
        status : 'success'
    })
})

module.exports = {
    protect,
    restrictTo,
    isLoggedIn,
    logout
}