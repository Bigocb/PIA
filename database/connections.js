const express = require('express');
var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var pgconnectionString = 'postgres://postgres:Lscooter11@localhost:5432/pia';
var db = pgp(connectionString);

module.export {

}