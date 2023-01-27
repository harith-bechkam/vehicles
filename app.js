var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/products');

var app = express();

var cors = require('cors');
const models = require('./models')
const dotenv = require('dotenv');
const authtoken = require('./utils/authtoken');
dotenv.config()

app.use(cors());

app.use(function (req, res, next) {
  var anonymousUrls = ['/auth/login'];
    var isAnonymousUrl = anonymousUrls.some(function (regex) {
      var buf = Buffer.from(req.originalUrl);
      return buf.indexOf(regex) > -1
    });
    if (isAnonymousUrl){ return next();
    }
  else{
    authtoken.verifyToken(req, res, next);
  }
  
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
// app.use('/users', usersRouter);



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
// app.use("*", (req, res, next) => {
//   const error = {
//     status: 404,
//     message: "API_ENDPOINT_NOT_FOUND_ERR",
//   };
//   next(error);
// });

// // global error handling middleware
// app.use((err, req, res, next) => {
//   console.log(err);
//   const status = err.status || 500;
//   const message = err.message || SERVER_ERR;
//   const data = err.data || null;
//   res.status(status).json({
//     type: "error",
//     message,
//     data,
//   });
// });

 app.listen(app.get('port'), function() {  
   console.log('app running on port', app.get('port'));
 });

module.exports = app;
