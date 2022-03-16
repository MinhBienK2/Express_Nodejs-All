const CatchAsync = require('../utils/CatchAsync')
const AppError = require('../utils/AppError')
const ApiFeature = require('../utils/ApiFeature');

exports.getAllDocument = Model => CatchAsync(async (req, res, next) => {
    let filter = {}
    if(req.params.tourId) filter = {tour : req.params.tourId}

    const feature = new ApiFeature(Model.find(filter),req.query)
            .filter()
            .sort()
            .limitFields()
            .pagination()
    let doc = await feature.query
    console.log('get data nhe ')
    res.status(200).json({
        status : 'success',
        data : {
            data : doc
        }
    })
})

exports.getOne = (Model,populateOption) => CatchAsync(async (req, res, next) => {
    const query = Model.findById(req.params.id)
    if(populateOption) query.populate(populateOption)
    const doc = await query
    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})
 

exports.createOne = Model => CatchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body)
    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})

exports.updateOne = Model => CatchAsync(async (req,res,next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators : true
    })
    if(!doc) return next(new AppError('No document found with that ID', 404))
    res.status(200).json({
        status : 'success',
        data : {
            data : doc
        }
    })
})

exports.deleteOne = Model => CatchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id)
    if(!doc) return next(new AppError('No document found with that ID', 404))
    res.status(204).json({
        status: 'success',
        data: null
    })
})



