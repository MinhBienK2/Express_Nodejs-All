const Tour = require('../src/models/tour')
const User = require('../src/models/user')
const CatchAsync = require('../utils/CatchAsync')

exports.overViews = CatchAsync(async (req,res,next) => {
        const user = await User.find()
        res.render('overView',{
                title : 'Over Tours',
                users : user
        })
})

exports.overTours = CatchAsync(async (req,res,next) => {
        res.render('tour',{
            title : 'tour'
        })
})

exports.login = CatchAsync(async (req,res,next) => {
        res.render('login',{
                title : 'Login'
        })
})