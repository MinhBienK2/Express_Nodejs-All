const AppError = require('../utils/appError');
const CatchAsync = require('../utils/CatchAsync');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login  = CatchAsync(async (req,res,next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email}).select('+password');
    if(!user || !(await bcrypt.compare(password,user.password))){
        return next(new AppError('Invalid email or password',401));
    }
    const token = jwt.sign({id : user.id},process.env.JWT_SECRET)
    res.cookie('jwt',token,{
        expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly : true,
    })
    res.status(200).json({
        status : 'success',
        token
    })
})