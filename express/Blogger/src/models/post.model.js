const mongoose = require('mongoose');
const moment = require('moment')

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
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
},{
    timestamps : false,
})

postSchema.index({
    title : 'text'
})

// postSchema.pre('save',async function(next) {
//     console.log(this.createdAt)
//     this.createdAt = moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss')
//     next()
// })

// postSchema.pre(/^find/,async function(next) {
//     c
//     this.createdAt = await moment(this.createdAt,'yyyy-MM-DD HH:mm:ss')
//     next()
// })

const Post = mongoose.model('Posts', postSchema);

module.exports = Post;