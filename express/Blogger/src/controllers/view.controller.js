const ApiError = require("../utils/ApiError");
const CatchAsync = require("../utils/CatchAsync");
const { User , Post , Category} = require("../models");
const { featureService ,viewService} = require("../services");
const axios = require("axios");

const getSignup = CatchAsync(async (req, res, next) => {
  res.render("signup");
});

const getLogin = CatchAsync(async (req, res, next) => {
  res.render("login", {

  });
});

const getAllPosts = CatchAsync(async (req,res,next) => {
  res.render('home', {} )
})

const getSearch = CatchAsync(async (req,res,next) => {
  res.render('search')
})

const getProfile = CatchAsync(async (req,res,next) => {
  res.render('profile')
})

const getCreatePost = CatchAsync(async (req,res,next) => {
  res.render('createPost')
})

module.exports = {
  getSignup,
  getLogin,
  getAllPosts,
  getSearch,
  getProfile,
  getCreatePost
};
