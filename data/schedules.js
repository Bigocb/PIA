const express = require('express');
var promise = require('bluebird');
var request = require('request-promise')
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:Lscooter11@localhost:5432/pia';
var db = pgp(connectionString);

var options = {
  promiseLib: Promise
};

//Weather Polling
setInterval(function(req,res,next) {   
  var pref_type = 'autopoll_weather';
  var pref_value = 'yes';
  db.one('select preff_value from prefs  where pref_type = $1 and preff_value = $2', [pref_type,pref_value]
).then(function (data) {
  var qval = JSON.stringify(data);
  console.log(qval.length);
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved ONE puppy'
      });
  if(qval.length > 0 ) {
    request("http://localhost:3000/test", function(error, response, body) {
      console.log(body);
    });
    return "positive";

  } else {
    return "negative";
  }   
  })    .catch(function (err) {
    return next(err);
  });
  
  }, 150000);
  
//



