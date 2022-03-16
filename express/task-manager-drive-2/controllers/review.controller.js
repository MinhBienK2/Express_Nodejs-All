const Review = require('../src/models/review.model')
const handleFactory = require('./hadleFactory.controller')


exports.setTourUserIds = (req,res,next) => {
    if(!req.body.tour) req.body.tour = req.params.tourId
    if(!req.body.user) req.body.user = req.user.id
    next()
}

exports.getAllReviews = handleFactory.getAllDocument(Review)
exports.getReview     = handleFactory.getOne(Review)
exports.createReview  = handleFactory.createOne(Review)
exports.updateReview  = handleFactory.updateOne(Review)
exports.deleteReview  = handleFactory.deleteOne(Review)