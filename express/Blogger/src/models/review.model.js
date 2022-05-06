const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    review : {
        type : String ,
        required : true
    },
    rating : {
        type : Number ,
        required : true,
        min : 1,
        max : 5
    },
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : 'Users',
    },
    postId : {
        type : mongoose.Schema.ObjectId,
        ref : 'Posts',
    }
},{
    timestamps : true
})

const Review = mongoose.model('Reviews', reviewSchema);

module.exports = Review