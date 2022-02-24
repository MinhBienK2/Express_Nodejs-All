const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : String,
    age : Number,
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
    }

})

const User = mongoose.model('Users',userSchema)

module.exports = User