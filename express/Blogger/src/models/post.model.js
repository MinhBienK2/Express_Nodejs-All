const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String,
        required : true,
    },
    photo : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : 'Users',
    },
    categoryId : {
        type : mongoose.Schema.ObjectId,
        ref : 'Categories',
    }
},{
    timestamps : true
})

postSchema.pre('save', async function (next) {
    // console.log(res.user)
})

const Post = mongoose.model('Posts', postSchema);

module.exports = Post;