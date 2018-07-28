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
setInterval(function() {
    request("http://localhost:3000/test", function(error, response, body) {
    console.log(body);
  });
  }, 600000);
  
//