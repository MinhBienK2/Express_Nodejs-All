const validator = require('validator')
const User = require('../src/model/user')

module.exports.login = async (req,res) => {
    res.render('auth/login')
}

module.exports.postLogin =async (req, res) => {
    const errors = []
    if(!validator.isEmail(req.body.email)){
        errors.push('Error Email !')
    }
    if(!validator.isStrongPassword(req.body.password)){
        errors.push('Error passwork !')
    }
    if(errors.length){
        res.render('auth/login',{
            errors,
            values : req.body
        })
        return
    }
    try{
        const user = await User.findOne({email : req.body.email,password : req.body.password})
        if(user){
            res.cookie('userId',user.id,{
                signed:true
            })
            res.redirect('/user')
            return
        }
        errors.push('not do exists !')
        res.render('auth/login',{
            errors,
            values : req.body
        })
    }catch(err) {
        console.log(err)
    }
}