const db = require('../database/connections');

// TODO: refactor function to serve all pref updates
function updatePrefs(req, res, next) {
  var type = 'default_zip'
  const id = req.params.name;
  db.any('update prefs set preff_value=$1 where pref_type=$2', [id, type])
    .then(function () {
      console.log('test');
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated'
        });
    })
    .catch(function (err) {
      console.log('fail');
      return next(err);
    });
};

function updateDate(req, res, next) {
  var type = 'date'
  const id = req.params.date;
  db.any('update prefs set preff_value=$1 where pref_type=$2', [id, type])
    .then(function () {
      console.log('test');
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated'
        });
    })
    .catch(function (err) {
      console.log('fail');
      return next(err);
    });
};

function getAllWeather(req, res, next) {
  var cat = 'weather';
  var node = 'current_observation';
  var node2 = 'display_location';
  var state = 'state_name';
  var city = 'city';
  var zip = 'zip';
  var obt = '4 hours';
  var tmp = 'temp_f';
  db.any('select distinct ' +
      '((response_data -> $2)->$3)->>$4 as state,' +
      '((response_data -> $2)->$3)->>$5 as city,' +
      '((response_data -> $2)->$3)->>$6 as zip,' +
      'to_timestamp(response_key) - (interval $7) observation_time,' +
      '((response_data -> $2)->>$8) as temp_f' +
      ' from responses where category = $1 ', [cat, node, node2, state, city, zip, obt, tmp])
    .then(function (data) {
      res.status(200)
        .json({
          data: data,
        });
      console.log(data);
    })
    .catch(function (err) {
      return next(err);
    });
};

function getData(req, res, next) {

  db.any('select to_timestamp(response_key-14440)  as timestamp ,response_data as data,source,category from responses where to_timestamp(response_key-14440) > current_date-1 order by response_key desc ')

    .then(function (data) {
      res.status(200)
        .json({
          data: data,
        });
      console.log(data);
    })
    .catch(function (err) {
      return next(err);
    });
};

function getDataCount(req, res, next) {
  var date_format = 'yyyy-mm-dd';
  db.any('select to_char(to_timestamp(a.response_key),$1),count(*) from responses a group by to_char(to_timestamp(a.response_key),$1) order by 1 desc', date_format)
    .then(function (data) {
      res.status(200)
        .json({
          data: data,
        });
      console.log(data);
    })
    .catch(function (err) {
      return next(err);
    });
};


function getCurrDate(req, res, next) {
  var key = 'date';
  db.any('select preff_value from prefs where pref_type = $1', key)
    .then(function (data) {
      res.status(200)
        .json({
          data: data,
        });
      console.log(data);
    })
    .catch(function (err) {
      return next(err);
    });
};

module.exports = {
  updateDate: updateDate,
  getAllWeather: getAllWeather,
  getData: getData,
  getCurrDate: getCurrDate,
  getDataCount: getDataCount,
  updatePrefs: updatePrefs
};