const express = require('express');
const router = express.Router();
const path = require('path');
var qu = require('../../data/queries');
var inb = require('../../data/inbound');
var sch = require('../../data/controls/schedules')
var analysis = require('../../data/analysis/logic')


router.get('/api/weather', qu.getAllWeather);

// Analytic Logic
router.get('/api/avgtemp/:id', analysis.getAverageTemps);
router.get('/api/avgcondition/:id', analysis.getAverageCondition);
router.get('/api/avghumidity/:id', analysis.getAverageHumidity);
router.get('/api/topnews/:id', analysis.getTopNews);

// external API routes (inbound)
router.get('/weather', inb.getWeather);
router.get('/media', inb.getMedia);
router.get('/news', inb.getNews);
router.get('/events', inb.getEvents);

// User Preference Plumbing


// main route
router.get('/', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'client', 'views', 'index.html'));
});

router.get('/admin', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'client', 'views', 'admin.html'));
});


module.exports = router;
