const ApiError = require('../utils/ApiError')
const CatchAsync = require('../utils/CatchAsync')
const ApiFeatureFilter = require('../utils/ApiFeatureFilter')

const getAll = (Model,populates=[]) => CatchAsync(async (req,res,next) => {
    let feature = new ApiFeatureFilter(Model.find(),req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination()
        .search()

    //populates
    if(populates){
        populates.forEach((el) => {
            feature.query = feature.query.populate(el)
        })
    }

    const doc = await feature.query
    if(!doc) {
        next(new ApiError(`${Model} not found`, 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            data : doc
        }
    })
})

const getOne = (Model,populates=[]) => CatchAsync(async (req,res,next) => {
    const query = Model.findById(req.params.id)
    if(populates){
        populates.forEach((el) => {
            query = query.populate(el)
        })
    }
    const doc = await query
    if(!doc) {
        next(new ApiError(`${Model} not found`, 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            data : doc
        }
    })
})

const createOne = (Model) => CatchAsync(async (req,res,next) => {
    const doc = await Model.create(req.body);
    if(!doc) {
        next(new ApiError(`${Model} not found`, 404))
    }
    res.status(201).json({
        status: 'success',
        data: {
            data : doc
        }
    })
})


const updateOne = (Model) => CatchAsync(async (req,res,next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id,req.body)
    if(!doc) {
        next(new ApiError(`${Model} not found`, 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            data : doc
        }
    })
})

const deleteOne = (Model) => CatchAsync(async (req,res,next) => {
    const doc = await Model.findByIdAndDelete(req.params.id)
    if(!doc) {
        next(new ApiError(`${Model} not found`, 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            data : doc
        }
    })
})

module.exports = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
}