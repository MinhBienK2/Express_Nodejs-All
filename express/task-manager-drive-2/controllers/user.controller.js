const User = require('../src/models/user')
const CatchAsync = require('../utils/CatchAsync')
const handleFactory = require('./hadleFactory.controller')
const AppError = require('../utils/appError')
const multer = require('multer')
const sharp = require('sharp')

const filterProperties = function (obj, ...allowed) {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if(allowed.includes(el))
            newObj[el] = obj[el]
    })
    return newObj
}


exports.getMe = (req, res, next) => {
    req.params.id = req.user.id
    next()
}

exports.updateMe = CatchAsync(async (req,res,next) => {
    if(req.body.password || req.body.passwordConfirm) 
        return next(
            new AppError(
                'This route is not for password update. Please use /updateMyPassword',
                400
            ))
    const filterProperty = filterProperties(req.body,"name","email")
    if(req.file) filterProperty.photo = req.file.filename //check update photo
    const user = await User.findByIdAndUpdate(req.user.id,filterProperty,{
        new : true,
        runValidators : true
    })
    res.status(200).json({
        status : 'success',
        data : {
            user
        }
    })
})

exports.deleteMe = CatchAsync(async (req,res,next) => {
    await User.findByIdAndUpdate(req.user.id,{active : false})
    res.status(204).json({
        status : 'success',
        data : null
    })
})

exports.createUser = CatchAsync(async (req,res) => {
    res.status(500).json({
        status : 'error',
        message : 'This route is not defined. Please use /signup'
    })
})

exports.getAllUsers = handleFactory.getAllDocument(User)
exports.getUser    = handleFactory.getOne(User)
// do not update passwords with this
exports.updateUser = handleFactory.updateOne(User)
exports.deleteUser = handleFactory.deleteOne(User)


// upload file

//note  : sử dụng new FormData().append('key', 'value') để upload file

// exports.upload = multer({
//     dest : 'public/images/users'
// })

// const multerStores = multer.diskStorage({
//     destination: function(req,file,cb) {
//         cb(null,'public/images/users')
//     },
//     filename: (req,file,cb) => {
//         const ext = file.mimetype.split('/')[1]
//         cb(null,`user-${req.user.id}-${Date.now()}.${ext}`)
//     }
// })


const multerMemory = multer.memoryStorage()

const multerFilters = (req,file,cb) => {
    if(file.mimetype.startsWith('image')) {
        cb(null,true)
    } else {
        cb(new AppError('Not an image! Please upload only images.',400),false)
    }
}

exports.upload = multer({
    storage: multerMemory,
    fileFilter: multerFilters
})

exports.resizeUserPhoto = async (req,res,next) => {
    if(!req.file) return next()
    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`
    sharp(req.file.buffer)
        .resize(500,500)
        .toFormat('jpeg')
        .jpeg({quality : 90})
        .toFile(`public/images/users/${req.file.filename}`)
    next()
}

exports.uploadFile = (req,res,next) => {
    res.status(200).json({
        status: 'success'
    })
}
