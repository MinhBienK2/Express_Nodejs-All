const ApiError = require('../utils/ApiError')
const CatchAsync = require('../utils/CatchAsync')
const ApiFeatureFilter = require('../utils/ApiFeatureFilter')
const {Post} = require('../models')
const multer = require('multer')
const sharp = require('sharp')

//
const multerStores = multer.memoryStorage()

const multerFilters = (req,file,cb) => {
    if(file.mimetype.startsWith('image')) {
        cb(null,true)
    } else {
        cb(new ApiError('Not an image! Please upload only images.',400),false)
    }
}

const upload = multer({
    storage: multerStores,
    fileFilter: multerFilters
})

// const uploadPostImage = upload.fields([{
//     name : 'photo', maxCount: 1
// }])

const uploadPostImage = upload.single('photo')

const resizePostPhoto = CatchAsync(async(req,res,next) => {
    // console.log(req.file)
    if(!req.file) return next()
    req.body.photo = `posts-${req.params.categoryId}-${Date.now()}-photo.jpeg`
    await sharp(req.file.buffer)
        .resize(700,700)
        .toFormat('jpeg')
        .jpeg({quality : 90})
        // .toFile(`public/images/posts/${req.body.photo}`)
        .toFile(`src/public/images/posts/${req.body.photo}`)
    next()
})

const getAllPostMe = CatchAsync(async (req,res,next) => {
    const userId = req.params.userId
    let feature = new ApiFeatureFilter(Post.find({userId}),req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination()

    feature.query.populate('userId').populate('categoryId')

    const doc = await feature.query
    if(!doc) {
        next(new ApiError(`posts not found`, 404))
    }
    res.status(200).json({
        status: 'success',
        data : doc
    })
})

const getAllPostsWithCategory = CatchAsync(async (req,res,next) => {
    const categoryId = req.params.categoryId
    let feature = new ApiFeatureFilter(Post.find({categoryId}),req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination()

    feature.query.populate('userId').populate('categoryId')

    const doc = await feature.query
    if(!doc) {
        next(new ApiError(`posts not found`, 404))
    }
    res.status(200).json({
        status: 'success',
        data : doc
    })
})

const createPost = CatchAsync(async (req,res,next) => {
    const categoryId = req.params.categoryId
    const userId = req.user.id
    const obj = {userId,...req.body,categoryId}
    const doc = await Post.create(obj);
    if(!doc) {
        next(new ApiError(`post not found`, 404))
    }
    res.status(201).json({
        status: 'success',
        data: {
            data : doc
        }
    })
})




module.exports = {
    createPost,
    uploadPostImage,
    resizePostPhoto,
    getAllPostsWithCategory,
    getAllPostMe
}