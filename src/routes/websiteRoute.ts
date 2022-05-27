import express = require('express');

const multer = require('multer');
const upload = multer();
const router = express.Router();
import {
  getArticle,
  getServerInfo,
  uploadFile,
  updatePVNum,
} from '../service/websiteService';

router.get('/getArticle', getArticle);
router.get('/getServerInfo', getServerInfo);
router.post('/uploadFile', upload.single('file'), uploadFile);
router.get('/updateVisitorNum', updatePVNum);

module.exports = router;
