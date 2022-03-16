const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name : {
        type : "String",
        required : true,
        trim : true
        },
    role : {
        type : "String",
        enum : ['user','admin'],
        default : 'user'
    },
    age : {
        type : "Number",
        default : 0,
    },
    email : {
        type : "String",
        required : true,
        trim : true,
        unique : true,
        validate : {
            validator : validator.isEmail,
            message : 'validate email'
        }
    },
    password : {
        type : "String",
        required : true,
        trim : true,
        minlength : 8,
        validate : {
            validator : validator.isStrongPassword,
            message : 'validate not strong password'
        },
        select : false
    },
    passwordConfirm : {
        type : "String",
        required : true,
        validate : {
            validator : function(value) {
                return value === this.password;
            },
            message : 'validate password confirm'
        }
    },
    passwordChangedAt : {
        type : "Date",
        select : false
    },
},{
    timestamps : true
})

userSchema.pre('save',async function(next) {
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password,12)
    this.passwordConfirm = undefined
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User