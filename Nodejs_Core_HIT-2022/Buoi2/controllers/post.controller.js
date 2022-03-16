const AppError = require('../utils/appError');
const CatchAsync = require('../utils/CatchAsync');
const Post = require('../models/post.model');
const {createOne, deleteOne, getAll, getOne, updateOne} = require('./handleFactory');

exports.insertProperty = (req,res,next) => {
    if(req.user) req.body.user = req.user.id
    next()
}

exports.getPost = getOne(Post)
exports.getAllPosts = getAll(Post)
exports.createPost = createOne(Post)
exports.updatePost = updateOne(Post)
exports.deletePost = deleteOne(Post)
