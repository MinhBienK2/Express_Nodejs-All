const {promisify} = require('util');
const jwt =require('jsonwebtoken')
const User = require('../src/models/user')
const CatchAsync = require('../utils/CatchAsync')
const AppError = require('../utils/appError')
const bcrypt = require('bcrypt')
const sendEmail = require('../utils/email')
const crypto = require('crypto')


const signToken = _id => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user,statusCode,res) => {
    // console.log(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000)
    const cookieOptions ={
        expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly : true
    }
    const token = signToken(user._id)
    if(process.env.NODE_ENV ==='production') 
        cookieOptions.secure = true
    res.cookie('jwt',token,cookieOptions)
    res.status(statusCode).json({
        status : 'success',
        token,
        data : {
            user
        }
    })
}

exports.signup = CatchAsync(async (req,res,next) => {
    const user =  new User(req.body)
    await user.save()
    createSendToken(user,201,res)
})

exports.login = CatchAsync(async (req,res,next) => {
    const {email,password} = req.body
    if(!email || !password) 
        return next(new AppError('Please provide email and password',400))
    const user = await User.findOne({email}).select('+password')
    const isCheck = await user.correctPassword(password,user.password)
    if(!isCheck || !user) 
        return next(new AppError('Incorrect email or password',401))
    const token = signToken(user._id)
    // const token = await user.generateAuthToken()
    createSendToken(user,200,res)
})

exports.logout = CatchAsync(async (req,res,next) => {
    res.cookie('jwt','loggedout',{
        expires : new Date(Date.now() + 10 * 1000),
        httpOnly : true
    })
    res.status(200).json({
        status : 'success'
    })
})

exports.protect = CatchAsync(async (req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    } else if(req.cookies.jwt){
        token = req.cookies.jwt
    }
    if(!token) return next(new AppError('You are not logged in',401))
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
    const freshUser = await User.findById(decoded._id)
    if(!freshUser) return next(new AppError('the user belonging to this token dose no longer exist',401))
    if(freshUser.changePasswordAfter(decoded.iat)){
        return next(new AppError('User recently changed password,Please login again',401))
    }
    req.user = freshUser
    next()
})

exports.isLoggedIn = async (req,res,next) => {
    if(req.cookies.jwt){
        try{
            const decoded = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET)
            const currentUser = await User.findById(decoded._id)
            if(!currentUser) 
                return next()
            if(currentUser.changePasswordAfter(decoded.iat)){
                return next()
            }
            res.locals.user = currentUser
            return next()
        } catch(err){
            return next()
        }
    }
    next()
}


exports.restrictTo = (...roles)=> {
    return (req,res,next) => {
        // console.log(roles)
        if(!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action',403))
        }
        next()
    }
}

exports.forgotPassword = CatchAsync(async (req, res, next) => {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email })
    if (!user) return next(new AppError('No user with that email found', 404))
    // Generate the random reset token
    const resetToken = await user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false}) // we dont want to validate the user before saving
    // Send it to user's email
    const resetURL = `${req.protocol}://${req.get('host')}/users/resetPassword/${resetToken}`
    const mesage = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: \n\n ${resetURL}`
    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valid for 10 minutes)',
            message: mesage
        })
    }catch(err){
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save({ validateBeforeSave: false })
        console.log(err)
        return next(new AppError('There was an error sending the email. Try again later', 500))
    }
    createSendToken(user,200,res)
})

exports.resetPassword = CatchAsync(async (req, res, next) => {
    // 1) Get user based on the token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({passwordResetToken : hashedToken,passwordResetExpires : {$gt : Date.now()}})
    if(!user) 
        return next(new AppError('Token is invalid or has expired',400))
    // 2) Set the new password
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()
    // 3) Update changedPasswordAt property for the user

    // 4) Log the user in, send JWT
    const token = signToken(user._id)
    createSendToken(user,200,res)
})


exports.updateMyPassword = CatchAsync(async (req,res,next) => {
    const user = await User.findById(req.user.id).select('+password')
    if(!await user.correctPassword(req.body.passwordCurrent,user.password)){
        return next(new AppError('Incorrect password',401))
    }
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    await user.save()
    const token = signToken(user._id)
    createSendToken(user,200,res)
})
