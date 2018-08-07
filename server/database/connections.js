const promise = require('bluebird');
const monitor = require('pg-monitor');

var options = {
  promiseLib: promise
};

const dbConfig = require('config').get('main');
const dbHost = dbConfig.get('dbConfig.host');
const dbPort = dbConfig.get('dbConfig.port');
const dbName = dbConfig.get('dbConfig.dbName');
const dbUser = dbConfig.get('dbConfig.user');
const dbPassword = dbConfig.get('dbConfig.pass');

monitor.attach(options);

// postgres
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://' + dbUser + ':' + dbPassword + '@' + dbHost + ':' + dbPort + '/' + dbName;
var db = pgp(connectionString);

module.exports = db;