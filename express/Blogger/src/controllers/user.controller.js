const ApiError = require('../utils/ApiError')
const CatchAsync = require('../utils/CatchAsync')
const {User} = require('../models')
const {featureService} = require('../services')


const getAllUsers = featureService.getAll(User)
const getUser = featureService.getOne(User)
const createUser = featureService.createOne(User)
const updateUser = featureService.updateOne(User)
const deleteUser = featureService.deleteOne(User)

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}