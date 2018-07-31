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
  var avg = Math.round(sum/tar.length);
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

function getAverageHumidity(req, res, next) {
  var day = req.params.id;
  var cat = 'weather';
  var section = 'current_observation';
  var key = 'dewpoint_f';
  var dateFormat = 'yyyy-mm-dd';
 var trimf = '%';
  db.any('select '+
  'trim($6 from ((response_data -> $2)->>$3))::int as humidity'+
    ' from responses where category = $1 and to_char(to_timestamp(response_key),$5) = $4',[cat,section,key,day,dateFormat,trimf])
    .then(function (data) { //build array of dew_point readings
      var tar = [];
      for (var i=0;i<data.length;i++) {
        var total = [];
        var date = [];
        total += Number(data[i].humidity) ;
        console.log(total);
        tar.push(parseInt(total));
      }  
      
      // takae avg of array
      var sum = 0;
        for(var i = 0; i < tar.length; i++){
           sum += tar[i]
        }
      var avg = sum/tar.length;
       
      // response logic
      if(avg != null){
         if (avg <= 55){
           feel = 'Dry and Comfortable'
         } else if(avg > 55 && avg < 65 ){
          feel = 'Kind od Sticky'
         } else {
           feel = 'Muggy and Oppressive'
         }  
      }
     res.status(200)
     .json({
        data:  feel
            });
    })
    .catch(function (err) {
      return next(err);
    });
};


//TODO: pull top 5 headlines and not top 1
//TODO: Add source with HTML
function getTopNews(req, res, next) {
  var day = req.params.id;
  var cat = 'news';
  var section = 'articles';
  var key = 'title';
  var h2s = '<h2>'
  var h2e = '</h2>'
  var dateFormat = 'yyyy-mm-dd';
  db.any('select '+
  'b ->> $3 as title'+
    ' from responses a join lateral jsonb_array_elements(response_data -> $2) b on true' +
    ' where category = $1 and to_char(to_timestamp(response_key),$5) = $4',[cat,section,key,day,dateFormat])
    .then(function (data) {
      var tar = [];
      for (var i=0;i<data.length;i++) {
        var total = [];
          total += data[i].title ;
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
console.log(freq);
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
  getAverageCondition: getAverageCondition,
  getAverageHumidity: getAverageHumidity,
  getTopNews: getTopNews
};
