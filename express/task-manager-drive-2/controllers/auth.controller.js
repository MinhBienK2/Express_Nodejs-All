const jwt =require('jsonwebtoken')
const User = require('../src/models/user')
const CatchAsync = require('../utils/CatchAsync')
const AppError = require('../utils/appError')
const bcrypt = require('bcrypt')


exports.signup = CatchAsync(async (req,res,next) => {
    const user =  new User(req.body)
    const token = await jwt.sign({id : user._id.toString()},process.env.JWT_SECRET,{expiresIn : process.env.JWT_EXPIRES_IN})
    user.tokens = user.tokens.concat({token})
    await user.save()
    res.status(201).json({
        status : 'success',
        data : {
            user,
            token
        }
    })
})

exports.login = CatchAsync(async (req,res,next) => {
    const {email,password} = req.body
    if(!email || !password) return next(new AppError('Please provide email and password',400))
    const user = await User.findOne({email}).select('+password')
    const isCheck = await user.correctPassword(password,user.password)
    if(!isCheck || !user) return next(new AppError('Incorrect email or password',401))
    const token = await user.generateAuthToken()
    res.status(200).json({
        status : 'success',
        data : {
            user ,
            token
        }
    })
})