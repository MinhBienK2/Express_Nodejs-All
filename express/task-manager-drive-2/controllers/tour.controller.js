const Tour = require('../src/models/tour')
const CatchAsync = require('../utils/CatchAsync')
const handleFactory = require('./hadleFactory.controller')
const multer = require('multer')
const sharp = require('sharp')


exports.getAllTours = handleFactory.getAllDocument(Tour)
exports.getTour = handleFactory.getOne(Tour,{path : 'reviews'})
exports.createTour = handleFactory.createOne(Tour)
exports.updateTour = handleFactory.updateOne(Tour) 
exports.deleteTour = handleFactory.deleteOne(Tour)


//upload files 

const multerStores = multer.memoryStorage()

const multerFilters = (req,file,cb) => {
    if(file.mimetype.startsWith('image')) {
        cb(null,true)
    } else {
        cb(new AppError('Not an image! Please upload only images.',400),false)
    }
}

const upload = multer({
    storage: multerStores,
    fileFilter: multerFilters
})

exports.uploadTourImage = upload.fields([
    { name: 'imageCover', maxCount: 1},
    { name: 'images', maxCount: 3 }
])

exports.resizeTourPhoto = async(req,res,next) => {
    console.log(req.files)
    if(!req.files.imageCover || !req.files.images) return next()
    req.body.imageCover = `tours-${req.params.id}-${Date.now()}-cover.jpeg`
    await sharp(req.files.imageCover[0].buffer)
        .resize(1100,1000)
        .toFormat('jpeg')
        .jpeg({quality : 90})
        .toFile(`public/images/tours/${req.body.imageCover}`)
    req.body.images = []
    await Promise.all(
        req.files.images.map(async (file,index) => {
            const fileImages = `tours-${req.params.id}-${Date.now()}-${index+1}.jpeg`
            await sharp(file.buffer)
                .resize(1200,700)
                .toFormat('jpeg')
                .jpeg({quality : 90})
                .toFile(`public/images/tours/${fileImages}`)
            req.body.images.push(fileImages) 
        })
    )
    next()
}


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

exports.getTourWithin = CatchAsync(async (req, res, next) => {
    const {distance,latLng,unit} = req.params
    const [lat,lng] = latLng.split(',')
    const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1
    if(!lat || !lng){
        next(new AppError('Please provide latitude and longitude in the format lat,lng',400))
    }
    const tours = await Tour.find({
        startLocation : {
            $geoWithin : {
                $centerSphere : [
                    [lat,lng],radius
                ]
            }
        }
    })
    res.status(200).json({
        status : 'success',
        results : tours.length,
        data : {
            data : tours
        }
    })
})

exports.getDistances = CatchAsync(async (req, res, next) => {
    const {latlng,unit} = req.params
    const [lng,lat] = latlng.split(',')
    const multiplier = unit ==='mi' ? 0.000621371 : 0.001
    if(!lat || !lng) {
        next(new AppError('Please provide latitude and longitude in the format lat,lng',400))
    }
    const distances = await Tour.aggregate([
        {
            $geoNear : {
                near : {
                    type : "Point",
                    coordinates : [lng * 1,lat * 1]
                },
                distanceField : 'distance',
                distanceMultiplier : multiplier
            },
        },
        {
            $project : {
                distance : 1, 
                name : 1
            }
        }
        
    ])
    res.status(200).json({
        status : 'success',
        data : {
            data : distances
        }   
    })
})