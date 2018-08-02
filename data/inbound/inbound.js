var Promise = require("bluebird");
const express = require('express');
var request = require('request-promise');
var db = require('../../database/connections');
var parseString = require('xml2js').parseString;
var sources = require('./sources')


function getWeather(req, res, next) {
  var src = [];
  Promise.map(sources.requestsweather, function (obj) {
    return request(obj).then(function (body) {

      src.push(obj.url);
      return JSON.parse(body);

    });

  }).then(function (results) {
    for (var i = 0; i < results.length; i++) {
      insJson = results[i];
      console.log(src);
      var source = 'weather';
      db.none('insert into responses(response_data, response_key, category,source)' +
          'values($1,extract(epoch from current_timestamp),$2,$3)', [insJson, source, src])
        .then(function () {
          res.status(200)
            .json({
              status: 'success',
              message: 'Inserted one puppy',
              data: insJson
            });

        })
    }
  }, function (err) {
    return next(err);
  });
}

function getNews(req, res, next) {
  var src = [];
  Promise.map(sources.requestsnews, function (obj) {
    return request(obj).then(function (body) {
      src.push(obj.url);
      return JSON.parse(body);
    });
  }).then(function (results) {
    for (var i = 0; i < results.length; i++) {
      insJson = results[i];
      var source = 'news';
      db.none('insert into responses(response_data, response_key, category,source)' +
          'values($1,extract(epoch from current_timestamp),$2,$3)', [insJson, source, src])
        .then(function () {
          res.status(200)
            .json({
              status: 'success',
              message: 'Inserted one puppy',
              data: insJson
            });

        })
    }
  }, function (err) {
    return next(err);
  });
}

function getEvents(req, res, next) {
  var src = [];
  Promise.map(sources.requestsevents, function (obj) {
    return request(obj).then(function (body) {
      src.push(obj.url);
      return JSON.parse(body);
    });
  }).then(function (results) {
    for (var i = 0; i < results.length; i++) {
      insJson = results[i];
      var source = 'events';
      db.none('insert into responses(response_data, response_key, category,source)' +
          'values($1,extract(epoch from current_timestamp),$2,$3)', [insJson, source, src])
        .then(function () {
          res.status(200)
            .json({
              status: 'success',
              message: 'Inserted one puppy',
              data: insJson
            });

        })
    }
  }, function (err) {
    return next(err);
  });
}

function getMedia(req, res, next) {
  var src = [];
  Promise.map(sources.requestsmedia, function (obj) {
    return request(obj).then(function (body) {
      
        src.push(obj.url);
        return JSON.parse(body);
    
    });
  }).then(function (result) {
    // console.log(result);
    for (var i = 0; i < result.length; i++) {
      insJson = result[i];
      var source = 'media';
      db.none('insert into responses(response_data, response_key, category,source)' +
          'values($1,extract(epoch from current_timestamp),$2,$3)', [insJson, source, src])
        .then(function () {
          res.status(200)
            .json({
              status: 'success',
              message: 'Inserted one puppy',
              data: insJson
            });
        })
    }
    }, function (err) {
    return next(err);
  });
}


module.exports = {
  getWeather: getWeather,
  getMedia: getMedia,
  getNews: getNews,
  getEvents: getEvents
};