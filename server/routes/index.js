const express = require('express');
const router = express.Router();
const path = require('path');
var qu = require('../../data/queries');
var inb = require('../../data/inbound');
var sch = require('../../data/controls/schedules')
var analysis = require('../../data/analysis/logic')

// outbound data routes 
router.get('/api/puppies', qu.getAllPuppies);
router.get('/api/puppies/:id', qu.getSinglePuppy);
//router.get('/api/avgtemp', analysis.getAverageTemps);
router.get('/api/avgtemp/:id', analysis.getAverageTemps);
router.get('/api/avgcondition/:id', analysis.getAverageCondition);
router.post('/api/puppies', qu.createPuppy);
router.put('/api/puppies/:id', qu.updatePuppy);
router.delete('/api/puppies/:id', qu.removePuppy);

// external API routes (inbound)
router.get('/weather', inb.getWeather);
router.get('/media', inb.getMedia);
router.get('/news', inb.getNews);
router.get('/events', inb.getEvents);


// main route
router.get('/', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'client', 'views', 'index.html'));
});


module.exports = router;
