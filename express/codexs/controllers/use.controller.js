const validator = require('validator')
const {nanoid} = require('nanoid')
const User = require('../src/model/user')


module.exports.user = async (req, res) => {
    try{
        const users = await  User.find({})
        res.render('index',{
            users
        })
    }catch(err) {
        console.log(err)
    }
}

module.exports.userSearch = async (req, res) =>{
    try{
        const users = await User.find({})
        const q = req.query.q 
        const renderSearch = users.filter(user => {
            return user.name.indexOf(q) != -1 ||  user.name.toLowerCase().indexOf(q.toLowerCase()) != -1 
        })
        res.render('user/search',{
            users : renderSearch
        })
    }catch(err) {
        console.log(err)
    }
}

module.exports.userCreate = async (req, res) =>{
    res.render('user/create')
}

module.exports.postUserCreate = (req, res) => {
    const errors=[]
    console.log(validator.isAlpha(req.body.name))
    if(!validator.isAlpha(req.body.name)){
        errors.push("error Enter name !")
    }
    if(!validator.isMobilePhone(req.body.phone)){
        errors.push("error phone number !")
    }
    if(!req.file){
        errors.push("empty file !")
    }
    if(errors.length > 0){
        res.render('user/create',{
            errors ,
            values : req.body
        })
        return 
    }
        const user = new User({
            name : req.body.name,
            phone : req.body.phone,
            avatar : req.file.path.split('\\').slice(1).join('\\')
        })
        user.save()
        res.redirect('/user')
}

module.exports.infoId = async (req,res) => {
    try{
        const id = req.params.id
        const users = await User.find({})
        const findUser = users.find(user => {
            return  user.id === id
        })
        res.render('user/viewUser',{
            user : findUser
        })  
    }catch(err){
        console.log(err)
    }
}