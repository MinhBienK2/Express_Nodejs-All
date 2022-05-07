const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const { User , Post , Category} = require("../models");
const { featureService ,viewService} = require("../services");

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
