const AppError = require('../utils/appError');
const CatchAsync = require('../utils/CatchAsync');
const SendEmail = require('../utils/sendEmail');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

exports.login  = CatchAsync(async (req,res,next) => {
    console.log(req.body.email)
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

exports.forgetPassword = CatchAsync(async (req,res,next) => {
    if(!req.body.email){
        return next(new AppError('Please provide an email',400));
    }
    const user = await User.findOne({email : req.body.email});
    if(!user){
        return next(new AppError('No user with that email',404));
    }
    const encoded = user.resetPasswordTokenUser()
    await user.save({validateBeforeSave:false});
    SendEmail({
        email : user.email,
        subject : 'Reset Password',
        message : `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n   
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://${req.get('host')}/users/resetPassword/${encoded}
        link expires in 10 minutes\n\n`
    })
    res.status(200).json({
        status : 'success',
        message : 'Check your email for reset password link'
    })
})

exports.resetPassword = CatchAsync(async (req,res,next) => {
    const decoded = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({resetPasswordToken: decoded,resetPasswordExpires: {$gt: Date.now()}});
    if(!user){
        return next(new AppError('Invalid or expired token',400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordChangedAt = Date.now();
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(200).json({
        status : 'success',
        message : 'Password reset successfully'
    }) 
})