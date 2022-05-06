const ApiError = require('../utils/ApiError')
const CatchAsync = require('../utils/CatchAsync')
const {Category} = require('../models')
const {featureService} = require('../services')



const getAllCategories = featureService.getAll(Category)
const getCategory = featureService.getOne(Category)
const createCategory = featureService.createOne(Category)
const updateCategory = featureService.updateOne(Category)
const deleteCategory = featureService.deleteOne(Category)

module.exports = {
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}