const CatchAsync =  require('../utils/CatchAsync')
const AppError = require('../utils/appError')


exports.getOne = (Model) => CatchAsync(async (req,res,next) => {
    const doc = await Model.findById(req.params.id)

    if(!doc) {
        return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})

exports.getAll = (Model) => CatchAsync(async (req,res,next) => {
    const reg = JSON.stringify(req.query).replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    const par = JSON.parse(reg)
    const get = Object.keys(par)
    console.log(get)
    let filter = {}
    if(par.name) {
        filter.name = {
            $regex: par.name,
            $options: 'i'
        }
    }else {
        filter = {...par}
    }
    console.log(filter)
    const docs = await Model.find(filter)
    res.status(200).json({
        status : 'success',
        results : docs.length,
        data : {
            data : docs
        }
    })
})

exports.createOne = Model => CatchAsync(async (req,res,next) => {
    const doc = await Model.create(req.body)
    res.status(201).json({
        status : 'success',
        data : {
            data : doc
        }
    })
})

exports.updateOne = Model => CatchAsync(async (req,res,next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true
    })
    if(!doc) {
        return next(new AppError('No document found with that ID',404))
    }
    res.status(200).json({
        status : 'success',
        data : {
            data : doc
        }
    })
})

exports.deleteOne = Model => CatchAsync(async (req,res,next) => {
    const doc = await Model.findByIdAndDelete(req.params.id)
    if(!doc) {
        return next(new AppError('No document found with that ID',404))
    }
    res.status(204).json({
        status : 'success',
        data : null
    })
})


