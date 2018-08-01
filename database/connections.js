var promise = require('bluebird');
const monitor = require('pg-monitor');

var options = {
  promiseLib: promise
};

var dbConfig = require('../database/config/config').get('main');
var dbHostPassport = dbConfig.get('dbConfig.host');
var dbPortPassport = dbConfig.get('dbConfig.port');
var dbNamePassport = dbConfig.get('dbConfig.dbName');
var dbUserPassport = dbConfig.get('dbConfig.user');
var dbPasswordPassport = dbConfig.get('dbConfig.pass');

monitor.attach(options); 

// local postgres connection
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://' + dbUserPassport + ':' + dbPasswordPassport + '@' + dbHostPassport +':' + dbPortPassport + '/' + dbNamePassport;
var db = pgp(connectionString);

module.exports = db;