var Promise = require("bluebird");
const express = require('express');
var request = require('request-promise');
const router = express.Router();
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:Lscooter11@localhost:5432/pia';
var db = pgp(connectionString);
var parseString = require('xml2js').parseString;

var options = {
  promiseLib: Promise
};
//TODO: share these variables gloablly for use in schedule.
var requestsmedia = [{
  url: 'http://localhost:32400/status/sessions?X-Plex-Token=gdzLRyxuy7yoALEgyUL6',
}];

var requestsnews = [{
  url: 'https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=1654f224d44d4dc491f416ef7950a051',
}];

var requestsweather = [{
  url: 'http://api.wunderground.com/api/c865737e39b62869/conditions/q/28270.json',
}];

function getWeather(req, res, next) {
Promise.map(requestsweather, function(obj) {
  return request(obj).then(function(body) {
        return JSON.parse(body);
  });
}).then(function(results) {
  for (var i = 0; i < results.length; i++) {
    insJson = results[i];
    var source = 'weather';
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

function getNews(req, res, next) {
  Promise.map(requestsnews, function(obj) {
    return request(obj).then(function(body) {
          return JSON.parse(body);
    });
  }).then(function(results) {
    for (var i = 0; i < results.length; i++) {
      insJson = results[i];
      var source = 'news';
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

//TODO: Add logic to process Both json and xml
//FIXME: Insert is happening but the parsed result is not being inserted
function getMedia(req, res, next) {
  Promise.map(requestsmedia, function(obj) {
    return request(obj).then(function(body) {
      parseString(body, function (err, result) {
        var resp = JSON.stringify(result);
        return JSON.parse(resp);
        });
    
    });
  }).then(function(results) {
    
    for (var i = 0; i < results.length; i++) {
      insJson = results[i];
      var source = 'media';
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
  getWeather: getWeather,
  getMedia: getMedia,
  getNews: getNews
  };
  