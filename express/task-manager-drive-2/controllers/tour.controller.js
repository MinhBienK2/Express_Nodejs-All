const ApiFeature = require('../utils/ApiFeature');
const Tour = require('../src/models/tour')
const CatchAsync = require('../utils/CatchAsync')


exports.filterTours =CatchAsync(async (req, res, next) => {
    const feature = new ApiFeature(Tour.find(),req.query)
            .filter()
            .sort()
            .limitfields()
            .pagination()
    let data = await feature.query
    res.status(200).json({
        status : 'success',
        data
    })
})

exports.getTourStats =CatchAsync(async (req, res, next) => {
    const tourStats = await Tour.aggregate([
        {
            $match : {  
                quantity : { $gte : 10}
            }
        },
        {
            $group : {
                _id : '$name',
                num : { $sum : 1},
                totalQuantity : { $sum : '$quantity'},
                totalPrice : { $sum : '$price'},
                avgPrice : { $avg : '$price'},
                avgQuantity : { $avg : '$quantity'},
                maxQuantity : { $max : '$quantity'},
                minQuantity : { $min : '$quantity'},
                maxPrice : { $max : '$price'},
                minPrice : { $min : '$price'}
            }
        },
        {
            $sort : {
                totalQuantity : -1
            }
        }
    ])
    res.status(200).json({
        status : 'success',
        data : tourStats
    })
})

exports.getMonthlyPlan =CatchAsync(async (req, res, next) => {
    const year = req.params.year *1
    const monthlyPlan = await Tour.aggregate([
        {
            $unwind : '$startDates'
        },
        {
            $match : {
                startDates : {
                    $gte : new Date(`${year}-01-01`),
                    $lte : new Date(`${year}-12-31`)
                }
            }
        },{
            $group : {
                _id : {
                    $month : '$startDates'
                },
                count : {
                    $sum : 1
                },
                nameTour : { 
                    $push : '$name'
                }
            }
        },{
            $addFields : {
                month : '$_id'
            }
        },{
            $project : {
                _id : 0
            }
        },{
            $sort : {
                _id : 1
            }
        }
    ])
    res.status(200).json({
        status : 'success',
        monthlyPlan 
    })
})

exports.createTour = CatchAsync(async (req, res, next) => {
    const tours = await Tour.create(req.body)
    tours.save()
    res.status(201).json({
        status: 'success',
        data: {
            tour: tours
        }
    })
})

exports.getTourById = CatchAsync(async (req, res, next) => {
    const tours = await Tour.findById(req.params.id)
    res.status(200).json({
        status: 'success',
        data: {
            tour: tours
        }
    })
})