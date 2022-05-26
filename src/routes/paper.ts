import express = require('express');

const router = express.Router();
const services = require('../service/paperService');

router.post('/submitPaper', services.submitPaper);

module.exports = router;
