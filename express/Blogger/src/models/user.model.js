const mongoose = require('mongoose');
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {
        type: String ,
        required: [true, 'Please add a name'],
    },
    email: {
        type : String,
        required : [true, 'Email is required'],
        unique : [true, 'Email already exists'],
        trim : true,
        lowercase : true,
        validate : [validator.isEmail,'Invalid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false,
        validate : [validator.isStrongPassword,'invalid Password']
    },
    confirmPassword : {
        type: String,
        required: [true, 'Confirm password is required'],
        validate : {
            validator : function(el) {
                return el === this.password;
            },
            message : 'Password and confirm password must be the same'
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    changePasswordAt : {
        type : Date
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date
},{
    timestamps: true
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password,12);
    this.confirmPassword = undefined;
    next()
})

userSchema.methods.correctPassword = async (password,hashPass) => { 
    return await bcrypt.compare(password,hashPass)
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



const User = mongoose.model('Users', userSchema);

module.exports = User;