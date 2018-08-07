const db = require('../../database/connections');

// weather vars
const node = 'current_observation';
const cat = 'weather'

//general vars
const dateFormat = 'yyyy-mm-dd';
const day = 'date';

function getAverageTemps(req, res, next) {
  let tmp = 'temp_f';
  db.any('select ' +
      '((response_data -> $2)->>$3) as temp_f' +
      ' from responses, prefs  where category = $1 and (to_char(to_timestamp(response_key-14440),$5))::date = preff_value::date and pref_type = $4', [cat, node, tmp, day, dateFormat])
    .then(function (data) {
      var tar = [];
      for (let i = 0; i < data.length; i++) {
        var total = [];
        total += Number(data[i].temp_f);
        tar.push(parseInt(total));
      }
   //   console.log(tar);
      var sum = tar.reduce(function (total, amount) {
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
  db.any('select ' +
      '((response_data -> $2)->>$1) as weather' +
      ' from responses, prefs where category = $1 and (to_char(to_timestamp(response_key-14440),$4))::date = preff_value::date and pref_type = $3', [cat, node, day, dateFormat])
    .then(function (data) {
      var tar = [];
      for (let i = 0; i < data.length; i++) {
        var total = [];
        total += data[i].weather;
        tar.push(total);
      }

      var freq = {};
      var max = 0;
      var result;

      for (let v in tar) {
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
  let key = 'dewpoint_f';
  let trimf = '%';
  db.any('select ' +
      'trim($6 from ((response_data -> $2)->>$3))::int as humidity' +
      ' from responses, prefs  where category = $1 and (to_char(to_timestamp(response_key-14440),$5))::date = preff_value::date and pref_type = $4 ', [cat, node, key, day, dateFormat, trimf])
    .then(function (data) { //build array of dew_point readings
      var tar = [];
      for (var i = 0; i < data.length; i++) {
        var total = [];
        total += Number(data[i].humidity);
        tar.push(parseInt(total));
      }
      // takae avg of array
         // takae avg of array
      var sum = tar.reduce( function(total, amount){
        return total + amount
      });
      
      var avg = sum / tar.length;
      // response logic
      console.log(tar);
      console.log(sum);
      console.log(avg);
      if (avg != null) {
        if (avg <= 55) {
          feel = 'Dry and Comfortable'
        } else if (avg > 55 && avg < 75) {
          feel = 'Kind of Sticky'
        } else if (avg >= 75) {
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
  let cat = 'news';
  let section = 'articles';
  let key = 'title';
  db.any('select ' +
      'b ->> $3 as title' +
      ' from responses a  join lateral jsonb_array_elements(response_data -> $2) b on true join prefs on (to_char(to_timestamp(response_key-14440),$5))::date = preff_value::date ' +
      ' where category = $1 and (to_char(to_timestamp(response_key-14440),$5))::date = preff_value::date  and pref_type = $4', [cat, section, key, day, dateFormat])
    .then(function (data) {
      var tar = [];

      for (let i = 0; i < data.length; i++) {
        var total = [];
        total += data[i].title;
        tar.push(total);
      }

      var freq = {};
      var max = 0;
      var result;

      for (let v in tar) {
        freq[tar[v]] = (freq[tar[v]] || 0) + 1;
        if (freq[tar[v]] > max) {
          max = freq[tar[v]];
          result = tar[v];
        }
      }
    //  console.log(freq);
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
  let events = 'events';
  let name = 'name';
  let text = 'text';
  let start = 'start';
  let local = 'local';
  db.any('select distinct' +
      '(b-> $2) ->> $3 as event_name,' +
      'substring((b-> $4) ->> $5,0,11) as date' +
      ' from responses ' +
      'join lateral jsonb_array_elements(response_data -> $1) b on true ' +
      'join prefs c on to_date(substring((b-> $4) ->> $5,0,11),$6) between c.preff_value::date and c.preff_value::date + 14 ' +
      'and c.pref_type = $7 ' +
      'where category = $1 ' +
      'order by 2 asc', [events, name, text, start, local, dateFormat, day])
    .then(function (data) {
    //  console.log(data);
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

  db.any('select * from health_data a ' +
      'join prefs b on start = preff_value ' +
      'where pref_type = $1', [day])
    .then(function (data) {
     // console.log(data);
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