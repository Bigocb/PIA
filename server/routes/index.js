const express = require('express');
const router = express.Router();
const path = require('path');
const inb = require('../../server/data/inbound/inbound');
const test = require('../../server/data/fileprocessing');
const util = require('../../server/data/util');
const analysis = require('../../server/data/analysis/logic')

// util routes
router.get('/util/updparam/:name', util.updatePrefs);
router.get('/util/date/:date', util.updateDate);
router.get('/util/file', inb.getMedia2);

// Outbound (frontend) Routes
router.get('/out/avgtemp/', analysis.getAverageTemps);
router.get('/out/avgcondition/', analysis.getAverageCondition);
router.get('/out/avghumidity/', analysis.getAverageHumidity);
router.get('/out/topnews/', analysis.getTopNews);
router.get('/out/events', analysis.getTopEvents);
router.get('/out/health', analysis.getDailyHealth);
router.get('/out/bobby', test.myFile);
router.get('/out/data', util.getData);
router.get('/out/curdate', util.getCurrDate);
router.get('/out/datacnt', util.getDataCount);


// external API routes (inbound)
router.get('/weather', inb.getWeather);
router.get('/media', inb.getMedia);
router.get('/news', inb.getNews);
router.get('/events', inb.getEvents);
router.get('/health', inb.getHealth);



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