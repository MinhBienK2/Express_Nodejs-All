const ApiError = require('../utils/ApiError')
const CatchAsync = require('../utils/CatchAsync')
const {Post} = require('../models')
const {featureService,postService} = require('../services')


const getAllPostsWithCategory = postService.getAllPostsWithCategory

const createPost = postService.createPost
const getAllPosts = featureService.getAll(Post,['userId','categoryId'])
const getPost = featureService.getOne(Post)
const updatePost = featureService.updateOne(Post)
const deletePost = featureService.deleteOne(Post)

module.exports = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    getAllPostsWithCategory
}