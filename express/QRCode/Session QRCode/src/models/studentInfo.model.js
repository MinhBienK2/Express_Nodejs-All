const mongoose = require('mongoose')
const validator = require('validator')

const studentInfoSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,'you need to enter name !'],
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
    phoneNumber : {
        type : String ,
        required : [true,'you need to enter phone number !'],
    },
    className : {
        type : String,
        required : [true,'you need to enter class name !'],
    },
    point : {
        type : Number,
        max: 100,
        min:0
    },
    comment : {
        type : String
    }
},{
    timestamps : true
})

const StudentInfo = mongoose.model('StudentInfos',studentInfoSchema)

module.exports = StudentInfo