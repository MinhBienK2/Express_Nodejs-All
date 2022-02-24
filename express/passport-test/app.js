var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var passport = require('passport');
var LocalStrategy = require('passport-local');
var jwt =require('jsonwebtoken');

const User = require('./src/models/user');
// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('helobannho1234@sdjf'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/login',async (req,res,next) => {
  res.render('login')
})

passport.use(new LocalStrategy(
  async function(username, password, done) {
    const user = await User.findOne({
      username,
      password
    }) 
    if(!user){ return done(null,false)}
    return done(null,user)
  }
));


app.post('/login', function(req, res, next) {
  passport.authenticate('local',async function(err, user) {
    if (err) { return res.status(500).json(err) }
    if (!user) {return res.redirect('/login'); }
    req.user = user
    const token = await jwt.sign({_id : user._id},'123345456')
    res.cookie('userId',token,{
      signed: true
    })
    res.redirect('users')
    // req.logIn(user, function(err) {
    //   if (err) { return next(err); }
    //   return res.redirect('/users/' + user.username);
    // });
  })(req, res, next);
});

// app.use('/login',loginRouter)
app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
