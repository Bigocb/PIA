const express = require('express');
const path = require('path');
var morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var winston = require('./config/winston');
const routes = require('./server/routes/index');
const app = express();
const scheduler = require('./data/controls/schedules')
var chai = require('chai');
var chaiHttp = require('chai-http');
// *** config file *** //
var should = chai.should();

chai.use(chaiHttp);


app.use(morgan('combined', {
  stream: winston.stream
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));

app.use('/', routes);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;