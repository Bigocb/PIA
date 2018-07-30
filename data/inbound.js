var Promise = require("bluebird");
const express = require('express');
var request = require('request-promise');
const router = express.Router();
var db = require('../database/connections');
var parseString = require('xml2js').parseString;

var options = {
  promiseLib: Promise
};
//TODO: read these in from a variables file
var requestsmedia = [
  {
  url: 'http://localhost:32400/status/sessions',
headers:  {
  'X-Plex-Token': 'gdzLRyxuy7yoALEgyUL6'
}
}
];

var requestsnews = [{
  url: 'https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=1654f224d44d4dc491f416ef7950a051',
},
];

//TODO: paramteraize location 
var requestsevents = [{
  url: 'https://www.eventbriteapi.com/v3/events/search/?location.address=charlotte',
  headers: {
    'location.address':'pakistan', //not working
    'Authorization': 'Bearer  QX23RPXQDYMPORJCBCG6'
  }
}
];

var requestsweather = [{
  url: 'http://api.wunderground.com/api/c865737e39b62869/conditions/q/28270.json',
}];

//TODO: Pass url out of requst so we can use it to store and analyze in the DB.
function getWeather(req, res, next) {
Promise.map(requestsweather, function(obj) {
  return request(obj).then(function(body) {
    console.log(obj.url);

        return JSON.parse(body);
   
        });
        
}).then(function(results) {
  for (var i = 0; i < results.length; i++) {
    insJson = results[i];
    var test = callurl;
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

  function getEvents(req, res, next) {
    Promise.map(requestsevents, function(obj) {
      return request(obj).then(function(body) {
            return JSON.parse(body);
      });
    }).then(function(results) {
      for (var i = 0; i < results.length; i++) {
        insJson = results[i];
        console.log(req);
        var source = 'events';
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
      return parseString(body, function (err, result) {
         console.dir(JSON.stringify(result));
              });
        });
  }).then(function(result) {
   // console.log(result);
    for (var i = 0; i < result.length; i++) {
      insJson = result[i];
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
     //   console.log(insJson);
    })
    }
  }, function(err) {
      return next(err);
  });
  }


module.exports = {
  getWeather: getWeather,
  getMedia: getMedia,
  getNews: getNews,
  getEvents: getEvents
  };
  