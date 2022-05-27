import express = require('express');
import multer = require('multer');

const upload = multer();

const router = express.Router();
import {
  login,
  getUserInfo,
  register,
  sendCode,
  updateUserInfo,
  updateUserImg,
  getAllUsers,
  changePassword,
} from '../service/usersService';

router.post('/login', login);
router.post('/register', register);
router.get('/getUserInfo', getUserInfo);
router.post('/sendCode', sendCode);
router.get('/getAllUsers', getAllUsers);
router.post('/updateUserInfo', updateUserInfo);
router.post('/updateUserImg', upload.single('file'), updateUserImg);
router.post('/changePassword', changePassword);

module.exports = router;
