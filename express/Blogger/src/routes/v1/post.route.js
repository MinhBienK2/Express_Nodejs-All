const express = require('express');
const router = express.Router();
const {postController} = require('../../controllers')
const {protect,restrictTo} = require('../../middlewares/auth.middleware')
const postService = require('../../services/post.service')
const uploadMiddleware = require('../../middlewares/upload.middleware')

router 
    .route('/')
    .get(postController.getAllPosts)

router
    .route('/me/:userId')
    .get(postController.getAllPostMe)

router
    .route('/:categoryId')
    .get(postController.getAllPostsWithCategory)
    .post(
        protect,
        restrictTo('user','boss','admin'),
        uploadMiddleware.uploadPostImage,
        uploadMiddleware.resizePostPhoto,
        postController.createPost
    )

router
    .route('/:id')
    .get(postController.getPost)
    .patch(protect,restrictTo('boss','admin'),postController.updatePost)
    .delete(protect,restrictTo('boss','admin'),postController.deletePost)

module.exports = router;