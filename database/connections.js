var promise = require('bluebird');
const monitor = require('pg-monitor');

var options = {
  promiseLib: promise
};

var dbConfig = require('config').get('main');
var dbHost = dbConfig.get('dbConfig.host');
var dbPort = dbConfig.get('dbConfig.port');
var dbName = dbConfig.get('dbConfig.dbName');
var dbUser = dbConfig.get('dbConfig.user');
var dbPassword = dbConfig.get('dbConfig.pass');

monitor.attach(options);

// local postgres connection
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://' + dbUser + ':' + dbPassword + '@' + dbHost + ':' + dbPort + '/' + dbName;
var db = pgp(connectionString);

module.exports = db;