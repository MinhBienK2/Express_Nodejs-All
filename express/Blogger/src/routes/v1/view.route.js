const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const { viewController, authController } = require("../../controllers");
const {
  isLoggedIn
} = require("../../middlewares/auth.middleware");
const uploadMiddleware = require('../../middlewares/upload.middleware')

router
    .route("/signup")
    .get(viewController.getSignup);

router
    .route("/login")
    .get(viewController.getLogin);

router
    .route('/summernote')
    .get((req,res,next) => {
        res.render('summernote');
    })
    
router.use(isLoggedIn);

router
    .route("/")
    .get(viewController.getAllPosts);

router
    .route('/search')
    .get(viewController.getSearch)

router
    .route('/profile/:userId')
    .get(viewController.getProfile)

router
    .route('/create-post')
    .get(viewController.getCreatePost)

router
    .route('/upload-file')
    .post(uploadMiddleware.uploadPostImage,uploadMiddleware.resizePostPhoto,viewController.uploadFile)

module.exports = router;
