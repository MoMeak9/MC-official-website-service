import express = require('express');

const multer = require('multer');
const upload = multer();
const router = express.Router();
const services = require('../service/websiteService');

router.get('/getArticle', services.getArticle);
router.get('/getServerInfo', services.getServerInfo);
router.post('/uploadFile', upload.single('file'), services.uploadFile);
router.get('/updateVisitorNum', services.updateVisitorNum);

module.exports = router;
