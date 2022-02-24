const User = require('../src/model/user')

exports.getUser = async (req,res,next) => {
    
    try{
        const users = await User.find()
        res.status(200).json({
            success : 'success',
            data : users
        })
    }catch(err){
        console.log(err)
    }
}

exports.postCreateUser =async (req,res,next) => {
    console.log(req.body)
    try{
        const user = await User.create(req.body)
        res.status(201).json({
            success : 'success',
            data : user
        })
    }catch(err){
        console.log(err)
    }
}

exports.patchUpdateUser =async (req,res,next) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true
        })
        console.log(req.body)
        res.status(200).json({
            success : 'success',
            data : user
        })
    }catch(err){
        console.log(req.params)
    }
}

exports.deleteUser =async (req,res,next) => {
    
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success : 'success',
            data : user
        })
    }catch(err){
        console.log(err)
    }
}

exports.getUserQuery =async (req,res,next) => {
    try{
        const users = await User.find(req.query)
        res.status(200).json({
            success : 'success',
            data : users
        })
    }catch(err){
        console.log(err)
    }
    
}