const request = require('request-promise')
const db = require('../../database/connections');

const options = {
  promiseLib: Promise
};

//Weather Polling
setInterval(function () {
  var pref_type = 'autopoll_weather';
  var pref_value = 'yes';
  db.one('select preff_value from prefs  where pref_type = $1 and preff_value = $2', [pref_type, pref_value]).then(function (data) {
    var qval = JSON.stringify(data);
    if (qval) {
      request("http://localhost:3000/weather", function (error, response, body) {});
      return "positive";
    } else {
      return "negative";
    }
  }).catch(function (err) {
    return err;
  });

}, 600000);

//news Polling
setInterval(function () {
  var pref_type = 'autopoll_news';
  var pref_value = 'yes';
  db.one('select preff_value from prefs  where pref_type = $1 and preff_value = $2', [pref_type, pref_value]).then(function (data) {
    var qval = JSON.stringify(data);
    if (qval) {
      request("http://localhost:3000/news", function (error, response, body) {
      });
      return "positive";
    } else {
      return "negative";
    }
  }).catch(function (err) {
    return err;
  });

}, 600000);

//Media Polling
setInterval(function () {
  var pref_type = 'autopoll_media';
  var pref_value = 'yes';
  db.one('select preff_value from prefs  where pref_type = $1 and preff_value = $2', [pref_type, pref_value]).then(function (data) {
    var qval = JSON.stringify(data);
    if (qval) {
      request("http://localhost:3000/media", function (error, response, body) {
      });
      return "positive";
    } else {
      return "negative";
    }
  }).catch(function (err) {
    return err;
  });

}, 600000);
//