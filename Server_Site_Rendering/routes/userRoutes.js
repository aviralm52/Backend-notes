const express = require('express');
const {generateShortUrl, getAnalytics, monitorClicks} = require('../controllers/userController.js');
const router = express.Router();

router.post('/', generateShortUrl);

router.get('/analytics/:shortId', getAnalytics);

router.get("/:shortid", monitorClicks)

module.exports = router ; 