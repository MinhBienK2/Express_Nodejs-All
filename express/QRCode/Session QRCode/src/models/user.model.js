const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true,'you need to enter name !']
    },
    email : {
        type : String,
        validate(value) {        // check xem có phải email hay không
            if(!validator.isEmail(value))
                 throw new Error('loi email')
        },
        required : [true,'you need to enter email !'],
        unique : [true,'exist email !']
    },
    password : {
        type : String,
        min : 6
    }
},{
    timestamps : true
})

const User = mongoose.model('Users',userSchema)

module.exports = User