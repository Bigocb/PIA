const express = require('express');
const router = express.Router();
const path = require('path');
var request = require('request-promise');
var db = require('../../data/queries');
var inb = require('../../data/inbound');
var inb2 = require('../../data/controls/schedules');

// theae will provide rhe content for tbe elements

router.get('/api/puppies', db.getAllPuppies);
router.get('/api/puppies/:id', db.getSinglePuppy);
router.post('/api/puppies', db.createPuppy);
router.put('/api/puppies/:id', db.updatePuppy);
router.delete('/api/puppies/:id', db.removePuppy);
router.get('/weather', inb.getWeather);
router.get('/media', inb.getMedia);
router.get('/news', inb.getNews);

router.get('/', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'client', 'views', 'index.html'));
});


module.exports = router;
