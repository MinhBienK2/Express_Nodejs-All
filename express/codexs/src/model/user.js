const mongoose = require('mongoose')
// require('../db/mongoose.js')

const User = new mongoose.model('User',{
    name : {
        type : String
    },
    phone : {
        type : String
    },
    email : {
        type : String,
    },
    password : {
        type : String
    },
    avatar : {
        type : String
    }
})

module.exports = User