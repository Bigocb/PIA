const express = require('express');
var promise = require('bluebird');
var request = require('request-promise');

//Weather Polling
setInterval(function() {
    request("http://localhost:3000/test", function(error, response, body) {
    console.log(body);
  });
  }, 600000);