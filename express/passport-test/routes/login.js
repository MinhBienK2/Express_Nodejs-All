const express = require('express');
const User = require('../src/models/user');
const router = express.Router()


  
// router.post('/', async (req,res,next) => {
//     const users =await User.create({ email: req.body.email, password: req.body.password })
//     await users.save()
//     res.redirect('users')
// })


module.exports = router
  