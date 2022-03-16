
const router = require('express').Router();
const {protect,reStrictTo} = require('../middlewares/auth.middleware');
const {getPost,getAllPosts,createPost,updatePost,deletePost,insertProperty} = require('../controllers/post.controller');

router
    .route('/')
    .get(getAllPosts)
    .post(protect,reStrictTo('user'),insertProperty,createPost)

router
    .route('/:id')
    .get(protect,reStrictTo('user','admin'),getPost)
    .patch(protect,reStrictTo('user'),updatePost)
    .delete(protect,reStrictTo('user','admin'),deletePost)

module.exports = router;