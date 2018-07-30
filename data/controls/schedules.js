const express = require('express');
var promise = require('bluebird');
var request = require('request-promise')
var db = require('../../database/connections');

var options = {
  promiseLib: Promise
};

//Weather Polling
setInterval(function() {   
  var pref_type = 'autopoll_weather';
  var pref_value = 'yes';
  db.one('select preff_value from prefs  where pref_type = $1 and preff_value = $2', [pref_type,pref_value]
).then(function (data) {
  var qval = JSON.stringify(data);
  console.log(qval.length);
  if(qval) {
    request("http://localhost:3000/weather", function(error, response, body) {
      console.log(body);
    });
    return "positive";
    console.log('yes');
  } else {
    return "negative";
    console.log('no');
  }   
  }).catch(function (err) {
    return err;
  });
  
  }, 600000);

//TODO: change url to relative 

  //news Polling
setInterval(function() {   
  var pref_type = 'autopoll_news';
  var pref_value = 'yes';
  db.one('select preff_value from prefs  where pref_type = $1 and preff_value = $2', [pref_type,pref_value]
).then(function (data) {
  var qval = JSON.stringify(data);
  console.log(qval.length);
  if(qval) {
    request("http://localhost:3000/news", function(error, response, body) {
      console.log(body);
    });
    return "positive";
    console.log('yes');
  } else {
    return "negative";
    console.log('no');
  }   
  }).catch(function (err) {
    return err;
  });
  
  }, 600000);
  
//



