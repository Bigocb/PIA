const Promise = require("bluebird");
const express = require('express');
const request = require('request-promise');
const db = require('../../database/connections');
const sources = require('./sources')
const file = require('../fileprocessing');


function getWeather(req, res, next) {
  var src = [];
  Promise.map(sources.requestsweather, function (obj) {
    return request(obj).then(function (body) {

      src.push(obj.url);
      return JSON.parse(body);

    });

  }).then(function (results) {
    for (let i = 0; i < results.length; i++) {
      insJson = results[i];
      console.log(src);
      let source = 'weather';
      db.none('insert into responses(response_data, response_key, category,source)' +
          'values($1,extract(epoch from current_timestamp),$2,$3)', [insJson, source, src])
        .then(function () {
          res.status(200)
            .json({
              status: 'success',
              message: 'Inserted',
              data: insJson
            });

        })
    }
  }, function (err) {
    return next(err);
  });
};

function getHealth(req, res, next) {
  var id = test;
  var source = 'health';
  src = 'file';
  db.none('insert into responses(response_data, response_key, category,source)' +
  'values($1,extract(epoch from current_timestamp),$2,$3)', [id, source, src])
    .then(function () {
      console.log('test');
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated'
        });
    })
    .catch(function (err) {
      console.log('fail');
      return next(err);
    });
};

function getNews(req, res, next) {
  var src = [];
  Promise.map(sources.requestsnews, function (obj) {
    return request(obj).then(function (body) {
      src.push(obj.url);
      return JSON.parse(body);
    });
  }).then(function (results) {
    for (let i = 0; i < results.length; i++) {
      insJson = results[i];
      let source = 'news';
      db.none('insert into responses(response_data, response_key, category,source)' +
          'values($1,extract(epoch from current_timestamp),$2,$3)', [insJson, source, src])
        .then(function () {
          res.status(200)
            .json({
              status: 'success',
              message: 'Inserted',
              data: insJson
            });

        })
    }
  }, function (err) {
    return next(err);
  });
};

function getEvents(req, res, next) {
  var src = [];
  Promise.map(sources.requestsevents, function (obj) {
    return request(obj).then(function (body) {
      src.push(obj.url);
      return JSON.parse(body);
    });
  }).then(function (results) {
    for (let i = 0; i < results.length; i++) {
      insJson = results[i];
      let source = 'events';
      db.none('insert into responses(response_data, response_key, category,source)' +
          'values($1,extract(epoch from current_timestamp),$2,$3)', [insJson, source, src])
        .then(function () {
          res.status(200)
            .json({
              status: 'success',
              message: 'Inserted',
              data: insJson
            });

        })
    }
  }, function (err) {
    return next(err);
  });
};

function getMedia(req, res, next) {
  var src = [];
  Promise.map(sources.requestsmedia, function (obj) {
    return request(obj).then(function (body) {

      src.push(obj.url);
      return JSON.parse(body);

    });
  }).then(function (result) {
    // console.log(result);
    for (let i = 0; i < result.length; i++) {
      insJson = result[i];
      let source = 'media';
      db.none('insert into responses(response_data, response_key, category,source)' +
          'values($1,extract(epoch from current_timestamp),$2,$3)', [insJson, source, src])
        .then(function () {
          res.status(200)
            .json({
              status: 'success',
              message: 'Inserted',
              data: insJson
            });
        })
    }
  }, function (err) {
    return next(err);
  });
};


module.exports = {
  getWeather: getWeather,
  getMedia: getMedia,
  getNews: getNews,
  getEvents: getEvents,
  getHealth: getHealth
};