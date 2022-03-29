const mongoose = require('mongoose');

postSchema = new mongoose.Schema({
    title : {
        type : "String",
        required : true,
        trim : true
    },
    content : {
        type : "String",
        trim : true
    },
    imageUrl : {
        type : "String",
        trim : true
    },
    description : {
        type : "String",
        trim : true
    },
    price : {
        type : "Number",
        default : 0
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    }
})

postSchema.pre('save', function(next){
    console.log(this.user)
    next()
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post