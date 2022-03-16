const mongoose = require('mongoose')
const slugify = require('slugify')
const User = require('./user')

const tourSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is required'],
        trim : true,
        unique : [true, 'Name already exists']
    },
    rating : {
        type : Number,
        default : 4.5,
    },
    slug: {
        type : String,
    },
    duration : {
        type : Number,
        required : [true, 'A tour must have a duration'],
        default : 0
    },
    maxGroupSize : {
        type : Number,
        required : [true, 'A tour must have a group size'],
    },
    difficulty : {
        type : String ,
        required : [true, 'A tour must have a difficulty'],
        enum : {
            values : ['easy', 'medium', 'difficult'],
            message : 'Difficulty is either easy, medium or difficult'
        }
    },
    ratingsAverage : {
        type : Number,
        default : 4.5,
        min : [1, 'Rating must be above 1.0'],
        max : [5, 'Rating must be below 5.0'],
        set : val => Math.round(val * 10) / 10
    },
    ratingsQuantity : {
        type : Number,
        default : 0
    },
    price : {
        type : Number,
        required : [true, 'A tour must have a price'],
    },
    priceDiscount : {
        type : Number,
        validate : {
            validator : function(val) {
                // this only points to current doc on NEW document creation
                return val < this.price
            },
            message : 'Discount price ({VALUE}) should be below regular price'
        }
    },
    summary : {
        type : String,
        trim : true,
        required : [true, 'A tour must have a summary']
    },
    description : {
        type : String,
        trim : true,
        required : [true, 'Description is required']
    },
    images : [String],
    imageCover : {
        type : String,
        required : [true, 'A tour must have a cover image']
    },
    // createdAt : {
    //     type : Date , 
    //     default : Date.now()
    // },
    startDates : [Date],
    secretTour : {
        type : Boolean,
        default : false
    },
    startLocation : {
        // GeoJSON
        type : {
            type : String,
            default : 'Point',
            enum : ['Point']
        },
        coordinates : [Number],
        address : String,
        description : String
    },
    locations : [
        {
            type : {
                type : String,
                default : 'Point',
                enum : ['Point']
            },
            coordinates : [Number],
            address : String,
            description : String,
            day : Number
        }
    ],
    guides : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'Users'
        }
    ]
},{
    timestamps : true,
    toJSON: {virtuals : true},
    toOject : {virtuals : true}
})

tourSchema.index({ price: 1, ratingAverage: -1 })
tourSchema.index({ slug : 1 })
tourSchema.index({ startLocation : '2dsphere' })

tourSchema.virtual('durations').get(function (){
    return this.price / 2
})

tourSchema.virtual('reviews',{
    ref : 'Review',
    foreignField : 'tour',
    localField : '_id',
    // count : true,
    // limit : 2,
    // skip : 0,
    // sort : {createdAt : -1}
    // match : {
    //     rating : { $gt : 2}
    // }
    match : rating =>({}) 
})

tourSchema.pre('save',async function(next) {
    this.slug = slugify(this.name, {lower : true})
    next()
})

tourSchema.pre(/^find/,async function(next) {
    this.populate({
        path : 'guides',
        select : '-__v -passwordChangedAt'
    })
    next()
})

// tourSchema.post(/^find/,async function(next) {
//     console.log('post ne')
// })

const Tour = mongoose.model('Tours',tourSchema)

module.exports = Tour
