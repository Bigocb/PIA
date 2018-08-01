var promise = require('bluebird');
const monitor = require('pg-monitor');

var options = {
  promiseLib: promise
};

monitor.attach(options); 

// local postgres connection
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:Lscooter11@localhost:5432/pia';
var db = pgp(connectionString);

module.exports = db;