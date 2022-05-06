const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const { User } = require("../models");
const { featureService } = require("../services");

const getSignup = CatchAsync(async (req, res, next) => {
  res.render("login", {});
});

const getLogin = CatchAsync(async (req, res, next) => {
  res.render("login", {});
});

const getAllPosts = CatchAsync(async (req,res,next) => {
  res.render('home')
})

module.exports = {
  getSignup,
  getLogin,
  getAllPosts
};
