const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')


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
    tokens : [
        {
            token : String
        }
    ]
})

userSchema.methods.generateAuthToken = async function () {
    const token = await jwt.sign({id : this._id.toString()},process.env.JWT_SECRET,{expiresIn : process.env.JWT_EXPIRES_IN})
    this.tokens = this.tokens.concat({token})
    // await this.save()
    return token
}

userSchema.methods.correctPassword =async function (password,userPassword) {
    return await bcrypt.compare(password,userPassword)
}

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password,12)
    this.passwordConfirm = undefined
    next()
})





const User = mongoose.model('Users', userSchema)


module.exports = User