const User = require('../src/model/user')

module.exports.checkLogin = (req,res,next) => {
        if(!req.signedCookies.userId){
            res.redirect('/auth/login')
            return 
        }
        if(!req.signedCookies.userId){
            res.redirect('/auth/login')
            return 
        }
    User.findOne({_id:req.signedCookies.userId}).then(user =>{
        if(!user){
            res.redirect('/auth/login')
            return 
        }
        res.locals.user = user
        next() 
        return
    }).catch(err => {
        console.log(err)
    })
}