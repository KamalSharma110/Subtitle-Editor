const express = require('express');

const subControllers = require('../controllers/subtitle');

const router = express.Router();

router.post('/store-video-url', subControllers.storeVideoUrl);

router.post('/store-sub', subControllers.storeSubtitleFile);

router.get('/download-sub/:id', subControllers.downloadSubtitleFile);


module.exports = router;


