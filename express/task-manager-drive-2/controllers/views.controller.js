const Tour = require("../src/models/tour");
const User = require("../src/models/user");
const CatchAsync = require("../utils/CatchAsync");

exports.overViews = CatchAsync(async (req, res, next) => {
    const user = await User.find();
    res.render("overView", {
        title: "Over Tours",
        users: user,
    });
});

exports.overTours = CatchAsync(async (req, res, next) => {
    const tours = await Tour.find();
    console.log(tours)
    res.render("tour", {
        title: "tour",
        tours
    });
});

exports.login = CatchAsync(async (req, res, next) => {
    res.render("login", {
        title: "Login",
    });
});
