const express = require('express');
const router = express.Router();
const path = require('path');
var qu = require('../../data/queries');
var inb = require('../../data/inbound');
var analysis = require('../../data/analysis/logic')

// util routes
router.get('/api/weather', qu.getAllWeather);
router.get('/data', qu.getData);
router.get('/api/updparam/:name',qu.updatePrefs);
router.get('/api/date/:date',qu.updateDate);
router.get('/api/curdate',qu.getCurrDate);
router.get('/datacnt', qu.getDataCount);

// Analytic Logic
router.get('/api/avgtemp/', analysis.getAverageTemps);
router.get('/api/avgcondition/', analysis.getAverageCondition);
router.get('/api/avghumidity/', analysis.getAverageHumidity);
router.get('/api/topnews/', analysis.getTopNews);
router.get('/api/events', analysis.getTopEvents);

// external API routes (inbound)
router.get('/weather', inb.getWeather);
router.get('/media', inb.getMedia);
router.get('/news', inb.getNews);
router.get('/events', inb.getEvents);

// TODO: User route


// main route
router.get('/', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'client', 'views', 'index.html'));
});

// admin route
router.get('/admin', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'client', 'views', 'admin.html'));
});

module.exports = router;
