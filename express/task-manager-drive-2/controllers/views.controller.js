const Tour = require('../src/models/tour')
const CatchAsync = require('../utils/CatchAsync')

exports.overTours = CatchAsync(async (req,res,next) => {
        const tour = await Tour.find()
        res.render('overView',{
                title : 'Over Tours',
                tours : tour
        })
})

exports.login = CatchAsync(async (req,res,next) => {
        res.render('login',{
                title : 'Login'
        })
})