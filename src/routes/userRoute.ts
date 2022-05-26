import express = require('express');

const multer = require('multer');
const upload = multer();
const router = express.Router();
import services, { login } from '../service/usersService';

router.post('/login', login);
router.post('/register', services.register);
router.get('/getUserInfo', services.getUserInfo);
router.post('/sendCode', services.sendCode);
router.get('/getAllUsers', services.getAllUsers);
router.post('/updateUserInfo', services.updateUserInfo);
router.post('/updateUserImg', upload.single('file'), services.updateUserImg);

module.exports = router;
