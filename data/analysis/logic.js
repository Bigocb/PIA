const express = require('express');
var promise = require('bluebird');
var db = require('../../database/connections');

function getAverageTemps(req, res, next) {
  var cat = 'weather';
  var node = 'current_observation';
  var tmp = 'temp_f';
  db.any('select distinct '+
  '((response_data -> $2)->>$3) as temp_f'+
    ' from responses where category = $1 and to_timestamp(response_key) > current_date',[cat,node,tmp])
    .then(function (data) {
      res.status(200)
        .json({
                data
               });
        console.log(data);
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
  getAverageTemps: getAverageTemps 
};
