const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: './public/uploads/' })

const controllers = require('../controllers/use.controller')



router.get('/search',controllers.userSearch)

router.get('/create',controllers.userCreate)

router.post('/create',upload.single('avatar'),controllers.postUserCreate)

router.get('/infor/:id',controllers.infoId)

router.get('/cookie',(req,res,next) => {
    res.cookie('user-id',12345)
    res.send("hêloo")
})

module.exports = router