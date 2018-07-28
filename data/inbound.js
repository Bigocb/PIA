var Promise = require("bluebird");
const express = require('express');
var request = require('request-promise');
const router = express.Router();
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:Lscooter11@localhost:5432/pia';
var db = pgp(connectionString);

var options = {
  promiseLib: Promise
};


var requestsweather = [{
  url: 'http://api.wunderground.com/api/c865737e39b62869/conditions/q/NC/Charlotte.json',
}];

function getWeather(req, res, next) {
Promise.map(requestsweather, function(obj) {
  return request(obj).then(function(body) {
    
    return JSON.parse(body);
    console.log(url);
  });
}).then(function(results) {
  for (var i = 0; i < results.length; i++) {
    insJson = results[i];
    var url = req.url;
    var source = 'weather';
    console.log(url);
    db.none('insert into responses(response_data, response_key, category)' +
    'values($1,extract(epoch from current_timestamp),$2)',
    [insJson,source])
  .then(function () {
    res.status(200)
      .json({
        status: 'success',
        message: 'Inserted one puppy',
        data: insJson
      });

  })
  }
}, function(err) {
    return next(err);
});
}



module.exports = {
  getWeather: getWeather
  };
  