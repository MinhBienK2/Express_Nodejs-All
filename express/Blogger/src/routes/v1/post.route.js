const express = require('express');
const router = express.Router();
const {postController} = require('../../controllers')
const {protect,restrictTo} = require('../../middlewares/auth.middleware')
const postService = require('../../services/post.service')

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
        postService.uploadPostImage,
        postService.resizePostPhoto,
        postController.createPost
    )

router
    .route('/:id')
    .get(postController.getPost)
    .patch(protect,restrictTo('boss','admin'),postController.updatePost)
    .delete(protect,restrictTo('boss','admin'),postController.deletePost)

module.exports = router;