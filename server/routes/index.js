const express = require('express');
const router = express.Router();
const path = require('path');
var request = require('request-promise');
var db = require('../../data/queries');
var inb = require('../../data/inbound');
var inb2 = require('../../data/schedules');

// theae will provide rhe content for tbe elements

router.get('/api/puppies', db.getAllPuppies);
router.get('/api/puppies/:id', db.getSinglePuppy);
router.post('/api/puppies', db.createPuppy);
router.put('/api/puppies/:id', db.updatePuppy);
router.delete('/api/puppies/:id', db.removePuppy);
router.get('/test', inb.getWeather);

router.get('/', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'client', 'views', 'index.html'));
});

/*
//TODO move to seperate files. and call function directly
setInterval(function() {
  request("http://localhost:3000/test", function(error, response, body) {
  console.log(body);
});
}, 600000);*/

module.exports = router;
