const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')
const crypto = require('crypto')


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Username is required'],
        trim : true,
    },
    email : {
        type : String,
        required : [true, 'Email is required'],
        trim : true,
        lowercase : true,
        unique : [true, 'Email already exists'],
        validate : [validator.isEmail,'Invalid email']
    },
    role : {
        type : String ,
        enum : ['user','guide','lead-guide','admin'],
        default : 'user'
    },
    photo : {
        type : String,
        default : 'default.jpg'
    },
    password : {
        type : String,
        required : [true, 'Password is required'],
        trim : true,
        minlength : [8, 'Password must be at least 6 characters long'],
        select : false
    },
    passwordConfirm : {
        type : String,
        required : [true, 'Password confirmation is required'],
        trim : true,
        validate : {
            validator : function(el){
                return el === this.password
            },
            message : 'Password and password confirmation do not match'
        }
    },
    changePasswordAt : {
        type : Date
    },
    passwordResetToken : String,
    passwordResetExpires : Date,
    active : {
        type : Boolean,
        default : true,
        select : false
    },
    // tokens : [
    //     {
    //         token : String
    //     }
    // ]
})

userSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret.role
    }
};

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password,12)
    this.passwordConfirm = undefined
    next()
})

userSchema.pre('save',async function (next) {
    if(!this.isModified('password') || this.isNew) return next()
    console.log(this.isModified('password'),this.isNew)
    this.passwordChangedAt = Date.now() - 1000;
    next()
})

userSchema.pre(/^find/, function (next) {
    this.find({active : {$ne : false}})
    next()
})

userSchema.methods.generateAuthToken = async function () {
    const token = await jwt.sign({id : this._id.toString()},process.env.JWT_SECRET,{expiresIn : process.env.JWT_EXPIRES_IN})
    this.tokens = this.tokens.concat({token})
    await this.save({validateBeforeSave : false}) // we dont want to validate the user before saving
    return token
}

userSchema.methods.correctPassword =async function (password,userPassword) {
    return await bcrypt.compare(password,userPassword)
}


userSchema.methods.changePasswordAfter = function (JWTTimestamp){
    if(this.changePasswordAt){
        const changeTimestamp = parseInt(
            this.changePasswordAt.getTime()/1000,
            10
        )
        return JWTTimestamp < changeTimestamp
    }
    return false
}

userSchema.methods.createPasswordResetToken =function () {
    const resetToken =crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto.createHash('sha256')
        .update(resetToken)
        .digest('hex')
    this.passwordResetExpires = Date.now() + 10 * 60 *1000;
    console.log({resetToken},this.passwordResetToken)
    return resetToken
}


const User = mongoose.model('Users', userSchema)


module.exports = User