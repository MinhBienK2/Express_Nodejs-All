const ApiError = require('../utils/ApiError')
const CatchAsync = require('../utils/CatchAsync')
const {Review} = require('../models')
const {featureService} = require('../services')



const getAllReviews = featureService.getAll(Review)
const getReview = featureService.getOne(Review)
const createReview = featureService.createOne(Review)
const updateReview = featureService.updateOne(Review)
const deleteReview = featureService.deleteOne(Review)

module.exports = {
    getAllReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview
}