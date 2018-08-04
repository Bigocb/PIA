const express = require('express');
var promise = require('bluebird');
var db = require('../../database/connections');

function getAverageTemps(req, res, next) {
  var day = 'date';
  var cat = 'weather';
  var node = 'current_observation';
  var tmp = 'temp_f';
  var dateFormat = 'yyyy-mm-dd';
  var interval = '4 hours';
  db.any('select ' +
      '((response_data -> $2)->>$3) as temp_f' +
      ' from responses, prefs  where category = $1 and (to_char(to_timestamp(response_key),$5)::date - (interval $6))::date = preff_value::date and pref_type = $4', [cat, node, tmp, day, dateFormat,interval])
    .then(function (data) {
      var tar = [];
      for (var i = 0; i < data.length; i++) {
        var total = [];
        var date = [];
        total += Number(data[i].temp_f);
        tar.push(parseInt(total));
      }
      console.log(tar);
      var sum = tar.reduce( function(total, amount){
        return total + amount
      });
      var avg = Math.round(sum / tar.length);
      res.status(200)
        .json({
          average_temp: avg
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

function getAverageCondition(req, res, next) {
  var day = 'date'
  var cat = 'weather';
  var node = 'current_observation';
  var interval = '4 hours';
  var dateFormat = 'yyyy-mm-dd';
  db.any('select ' +
      '((response_data -> $2)->>$1) as weather' +
      ' from responses, prefs where category = $1 and (to_char(to_timestamp(response_key),$4)::date - (interval $5))::date = preff_value::date and pref_type = $3', [cat, node, day, dateFormat,interval])
    .then(function (data) {
      var tar = [];
      for (var i = 0; i < data.length; i++) {
        var total = [];
        total += data[i].weather;
        tar.push(total);
      }

      var freq = {};
      var max = 0;
      var result;

      for (var v in tar) {
        freq[tar[v]] = (freq[tar[v]] || 0) + 1;
        if (freq[tar[v]] > max) {
          max = freq[tar[v]];
          result = tar[v];
        }
      }

      res.status(200)
        .json({
          data: result
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

function getAverageHumidity(req, res, next) {
  var day = 'date';
  var cat = 'weather';
  var section = 'current_observation';
  var key = 'dewpoint_f';
  var interval = '4 hours';
  var dateFormat = 'yyyy-mm-dd';
  var trimf = '%';
  
  db.any('select ' +
      'trim($6 from ((response_data -> $2)->>$3))::int as humidity' +
      ' from responses, prefs  where category = $1 and (to_char(to_timestamp(response_key),$5)::date - (interval $7))::date = preff_value::date and pref_type = $4 ', [cat, section, key, day, dateFormat, trimf,interval])
    .then(function (data) { //build array of dew_point readings
      var tar = [];
      for (var i = 0; i < data.length; i++) {
        var total = [];
        var date = [];
        total += Number(data[i].humidity);
        console.log(total);
        tar.push(parseInt(total));
      }

     // takae avg of array
      var sum = tar.reduce( function(total, amount){
        return total + amount
      });
      var avg = sum / tar.length;

      // response logic
      if (avg != null) {
        if (avg <= 55) {
          feel = 'Dry and Comfortable'
        } else if (avg > 55 && avg < 65) {
          feel = 'Kind od Sticky'
        } else {
          feel = 'Muggy and Oppressive'
        }
      }
      res.status(200)
        .json({
          data: feel
        });
    })
    .catch(function (err) {
      return next(err);
    });
};


function getTopNews(req, res, next) {
  var day = 'date';
  var cat = 'news';
  var section = 'articles';
  var key = 'title';
  var interval = '4 hours';
  var dateFormat = 'yyyy-mm-dd';
  db.any('select ' +
      'b ->> $3 as title' +
      ' from responses a  join lateral jsonb_array_elements(response_data -> $2) b on true join prefs on (to_char(to_timestamp(response_key),$5)::date - (interval $6))::date = preff_value::date ' +
      ' where category = $1 and (to_char(to_timestamp(response_key),$5)::date - (interval $6))::date = preff_value::date  and pref_type = $4', [cat, section, key, day, dateFormat,interval])
    .then(function (data) {
      var tar = [];

      for (var i = 0; i < data.length; i++) {
        var total = [];
        total += data[i].title;
        tar.push(total);
      }

      var freq = {};
      var max = 0;
      var result;

      for (var v in tar) {
        freq[tar[v]] = (freq[tar[v]] || 0) + 1;
        if (freq[tar[v]] > max) {
          max = freq[tar[v]];
          result = tar[v];
        }
      }
      console.log(freq);
      res.status(200)
        .json({
          data: result
        });
    })
    .catch(function (err) {
      return next(err);
    });
};


function getTopEvents(req, res, next) {
  var events = 'events';
  var name = 'name';
  var text = 'text';
  var start = 'start'
  var local = 'local'
  var dateFormat = 'yyyy-mm-dd';
  var pref_type = 'date';
  db.any('select distinct' +
      '(b-> $2) ->> $3 as event_name,' +
      'substring((b-> $4) ->> $5,0,11) as date' +
      ' from responses ' +
      'join lateral jsonb_array_elements(response_data -> $1) b on true ' +
      'join prefs c on to_date(substring((b-> $4) ->> $5,0,11),$6) between c.preff_value::date and c.preff_value::date + 14 '+
      'and c.pref_type = $7 ' +
      'where category = $1 ' +
      'order by 2 asc', [events, name, text, start, local, dateFormat,pref_type ])
    .then(function (data) {
      console.log(data);
      res.status(200)
        .json({
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

function getDailyHealth(req, res, next) {
  var date = 'date';
  db.any('select * from health_data a ' +
      'join prefs b on start = preff_value ' +
      'where pref_type = $1', [date])
    .then(function (data) {
      console.log(data);
      res.status(200)
        .json({
          data: data
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
  getTopNews: getTopNews,
  getTopEvents: getTopEvents,
  getDailyHealth: getDailyHealth
};