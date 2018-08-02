var request = require('request-promise')
var db = require('../../database/connections');
var inbound = require('../inbound/inbound')



setInterval(() => {
  inbound.getWeather().then((data) => {
    console.log(data);
  });
}, 300000);

setInterval(() => {
  inbound.getNews().then((data) => {
    console.log(data);
  });
}, 400000);


