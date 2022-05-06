const ApiError = require('../utils/ApiError')
const CatchAsync = require('../utils/CatchAsync')
const jwt = require('jsonwebtoken')

const signToken = (id) => {
    const token = jwt.sign({id},process.env.JWT_SECURE,{
        expiresIn : process.env.JWT_EXPIRES_IN
    })
    return token
}

const sendResponeToken = (user,statusCode,res) => {
    // console.log(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000)
    const cookieOptions ={
        expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly : true,
        // secure : req.secure || req.headers['x-forwarded-proto'] === 'https'
        secure : true
    }
    const token = signToken(user._id)
    res.cookie('jwt',token,cookieOptions)
    res.status(statusCode).json({
        status : 'success',
        token,
        data : {
            user
        }
    })
}

module.exports = {
    signToken,
    sendResponeToken
}