const express = require('express');
var promise = require('bluebird');
var db = require('../../database/connections');

function getAverageTemps(req, res, next) {
  var day = req.params.id;
  var cat = 'weather';
  var node = 'current_observation';
  var tmp = 'temp_f';
  var dateFormat = 'yyyy-mm-dd';
  db.any('select '+
  '((response_data -> $2)->>$3) as temp_f'+
    ' from responses where category = $1 and to_char(to_timestamp(response_key),$5) = $4',[cat,node,tmp,day,dateFormat])
    .then(function (data) {
      var tar = [];
      for (var i=0;i<data.length;i++) {
        var total = [];
        var date = [];
        total += Number(data[i].temp_f) ;
        tar.push(parseInt(total));
      }  
console.log(tar);
  var sum = 0;
    for(var i = 0; i < tar.length; i++){
       sum += tar[i]
    }
  var avg = sum/tar.length;

     res.status(200)
     .json({
          average_temp:   avg
            });
    })
    .catch(function (err) {
      return next(err);
    });
};

function getAverageCondition(req, res, next) {
  var day = req.params.id;
  var cat = 'weather';
  var node = 'current_observation';
  var dateFormat = 'yyyy-mm-dd';
  db.any('select '+
  '((response_data -> $2)->>$1) as weather'+
    ' from responses where category = $1 and to_char(to_timestamp(response_key),$4) = $3',[cat,node,day,dateFormat])
    .then(function (data) {
      var tar = [];
      for (var i=0;i<data.length;i++) {
        var total = [];
          total += data[i].weather ;
        tar.push(total);
      }  

var freq = {};
var max = 0;
var result;

for(var v in tar){
  freq[tar[v]]=(freq[tar[v]] || 0)+1; 
  if(freq[tar[v]] > max) {
          max = freq[tar[v]];  
          result = tar[v]; 
  }
}

     res.status(200)
     .json({
        data:  result
            });
    })
    .catch(function (err) {
      return next(err);
    });
};

module.exports = {
  getAverageTemps: getAverageTemps,
  getAverageCondition: getAverageCondition
};
