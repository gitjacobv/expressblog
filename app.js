require( './models/db' );

var express = require('express');
var session = require('express-session')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('express-flash');

var mongo = require('mongodb');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');
var posts = require('./routes/posts');
var admin = require('./routes/admin');

var expressLayouts = require('express-ejs-layouts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(function(req, res, next){
   //append request and session to use directly in views and avoid passing around needless stuff

    if(req.session != null && req.session.curr_user != null)
    {
        res.locals.curr_user = req.session.curr_user;

    }else{
        res.locals.curr_user = null;
        if(req.method != 'POST' && req.originalUrl != '/favicon.ico' && req.originalUrl !='/' && req.originalUrl != '/signin' && req.originalUrl != '/users/create'){
          res.redirect('/');
        }
    }

    next(null, req, res);
});

app.use('/', routes);
app.use('/users', users);
app.use('/users/:id/posts', posts);
app.use('/admin', admin);

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
