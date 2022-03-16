const mongoose = require('mongoose')
const Tour = require('./tour')

const reviewSchema = mongoose.Schema({
    review : {
        type : String,
        required : [true, 'Review is required'],
        unique : [true, 'name already exists'],
    },
    rating : {
        type : Number,
        required : [true, 'Rating is required'],
        min : [1, 'Rating must be above 1.0'],
        max : [5, 'Rating must be below 5.0']
    },
    // createdAt : {
    //     type : Date,
    //     default : Date.now()
    // },
    tour : {
        type : mongoose.Schema.ObjectId,
        ref : 'Tours',
        // required : [true, 'Review must belong to a tour']
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'Users',
        // required : [true, 'Review must belong to a user']
    }
},{
    timestamps : true ,
    toJSON : { virtuals : true },
    toObject : { virtuals : true }
})

reviewSchema.index({ tour: 1, user: 1 }, { unique: true})

reviewSchema.pre(/^find/,async function(next){
    this
        // .populate({
        //     path : 'tour',
        //     select : 'name'
        // })
        .populate({
            path : 'user',
            select : 'name photo'
        })
    next()
})


reviewSchema.statics.calcAverageRating = async function (tourId) {
    const stats = await this.aggregate([
        {
            $match : {
                tour : tourId
            }
        },
        {
            $group : {
                _id : tourId,
                ratingsQuantity : { $sum : 1},
                RatingsAverage : { $avg : '$rating'}
            }
        }
    ])
    console.log(stats)
    if(stats){
        await Tour.findByIdAndUpdate(tourId,{
            ratingsQuantity : stats[0].ratingsQuantity,
            ratingsAverage : stats[0].ratingsAverage
        })
    }else{
        await Tour.findByIdAndUpdate(tourId,{
            ratingsQuantity : 0,
            ratingsAverage : 4.5
        })
    }
}


reviewSchema.post('save',async function() {
    this.constructor.calcAverageRating(this.tour)
})

reviewSchema.pre(/^findOneAnd/,async function (next) {
    this.r = await this.clone().findOne()// dùng clone để tránh lỗi query has already executed
    next()
})

reviewSchema.post(/^findOneAnd/,async function () {
    // this.r = await this.clone().findOne() 
    this.r.constructor.calcAverageRating(this.r.tour)
})

module.exports = mongoose.model('Review', reviewSchema)