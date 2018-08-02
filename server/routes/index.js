const express = require('express');
const router = express.Router();
const path = require('path');
var inb = require('../../data/inbound/inbound');
var util = require('../../data/util');
var analysis = require('../../data/analysis/logic')

// util routes
router.get('/api/weather', util.getAllWeather); //may not need
router.get('/data', util.getData);
router.get('/api/updparam/:name', util.updatePrefs);
router.get('/api/date/:date', util.updateDate);
router.get('/api/curdate', util.getCurrDate);
router.get('/datacnt', util.getDataCount);

// Analytic Routes
router.get('/api/avgtemp/', analysis.getAverageTemps);
router.get('/api/avgcondition/', analysis.getAverageCondition);
router.get('/api/avghumidity/', analysis.getAverageHumidity);
router.get('/api/topnews/', analysis.getTopNews);
router.get('/api/events', analysis.getTopEvents);
router.get('/api/health', analysis.getDailyHealth);


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

// admin route
router.get('/admin', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'client', 'views', 'admin.html'));
});

module.exports = router;