const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is required'],
        trim : true,
        unique : [true, 'Name already exists']
    },
    price : {
        type : Number,
        min : [0,'price cannot be less than 0']
    },
    quantity : {
        type : Number,
        min : [0,'Quantity cannot be less than 0']
    },
    // createdAt : {
    //     type : Date , 
    //     default : Date.now()
    // },
    startDates : [Date]
},{
    timestamps : true,
    toJSON: {virtuals : true},
    toOject : {virtuals : true}
})

tourSchema.virtual('duration').get(function (){
    return this.price / 2
})

tourSchema.pre('save',async function(next) {
    console.log(this)
})

const Tour = mongoose.model('Tours',tourSchema)

module.exports = Tour

// const createTour = new Tour({
//     name : 'd',
//     price : 333,
//     quantity : 153,
//     startDates : [
//         '2022-05-26T06:27:51.676+00:00',
//         '2019-04-11T06:27:51.676+00:00',
//         '2022-01-12T06:27:51.676+00:00',
//     ]
// })

// createTour
//     .save()
//     .then((data) => console.log(data))
 