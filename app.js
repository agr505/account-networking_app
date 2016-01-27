var express = require('express');
var busboy = require('connect-busboy');
var path = require('path');
//--
var fs = require('fs-extra');
//----
//------


//------
var favicon = require('serve-favicon');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('client-sessions');
var bodyParser = require('body-parser');
var mongodb=require('mongodb');
var routes = require('./routes/index');
var users = require('./routes/users');
var avatar=require('./routes/avatar');
var login = require('./routes/login');
var account = require('./routes/account');
var blog= require('./routes/blog');
var profile = require('./routes/profile');

var app = express();
//----

app.use(busboy());

app.use(express.static(path.join(__dirname, 'public')));
//----
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  cookieName: 'session',
  secret: 'cookie_secret',
  //duration:60000
  duration:30 * 60 * 1000,
  activeDuration:5 * 60 * 1000

}));
app.use(express.static(path.join(__dirname, 'public')));
var db=mongodb.connect('mongodb://127.0.0.1:27017/userdb', function (err, db) {
  if (err) {
    throw err;
  } else {
   app.locals.db=db;

    console.log("successfully connected to the database");




  }});



app.use('/',routes);
app.use('/users', users);
app.use('/avatar',avatar);
app.use('/login', login);
app.use('/account', account);
app.use('/blog', blog);
app.use('/profile',profile);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
