const ApiError = require('../utils/ApiError')
const CatchAsync = require('../utils/CatchAsync')
const {User} = require('../models')
const bcrypt = require('bcrypt')
const {authService,featureService} = require('../services')

const signup = featureService.createOne(User)

const login = CatchAsync(async (req,res,next) => {
    const {email,password} = req.body
    if(!email && !password) {
        return next(new ApiError('Email or Password is not exists !',400))
    }
    const user = await User.findOne({email}).select('+password')
    if(!user){
        return next(new ApiError('incorrect email or password !',404))
    }
    const encodePass = await user.correctPassword(password,user.password)
    if(!user || !encodePass) {
        return next(new ApiError('incorrect email or password !',404))
    }
    authService.sendResponeToken(user,200,res)
})


module.exports = {
    login,
    signup
}