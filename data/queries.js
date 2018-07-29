const express = require('express');
var promise = require('bluebird');
var inb = require('../data/inbound');
var db = require('../database/connections');

//TODO: tune query to avoid multiples without distinct
function getAllPuppies(req, res, next) {
  var cat = 'weather';
  var node = 'current_observation';
  var node2 = 'display_location';
  var state = 'state_name';
  var city = 'city';
  var zip = 'zip';
  var obt = 'observation_time';
  var tmp = 'temp_f';
  db.any('select distinct '+
  '((response_data -> $2)->$3)->>$4 as state,'+
  '((response_data -> $2)->$3)->>$5 as city,'+
  '((response_data -> $2)->$3)->>$6 as zip,'+
  '((response_data -> $2)->>$7) as observation_time,'+
  '((response_data -> $2)->>$8) as temp_f'+
  ' from responses where category = $1 ',[cat,node,node2,state,city,zip,obt,tmp])
    .then(function (data) {
      res.status(200)
        .json({
                data: data,
               });
        console.log(data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSinglePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.one('select * from fact_pia_weather where source_key = $1', pupID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createPuppy(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into pups(name, breed, age, sex)' +
      'values(${name}, ${breed}, ${age}, ${sex})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

// TODO: refactor function to serve all polling updates
function updatePuppy(req, res, next) {
  db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
    [req.body.name, req.body.breed, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.result('delete from pups where id = $1', pupID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} puppy`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
  getAllPuppies: getAllPuppies,
  getSinglePuppy: getSinglePuppy,
  createPuppy: createPuppy,
  updatePuppy: updatePuppy,
  removePuppy: removePuppy
};
