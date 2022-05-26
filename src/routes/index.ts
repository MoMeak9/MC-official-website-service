import express = require('express');

import expressJWT = require('express-jwt');
const createError = require('http-errors');
import { PRIVATE_KEY, whitelist } from '../config';
// Routes
// const usersRouter = require('../routes/users');
const websiteRouter = require('./websiteRoute');
const userRouter = require('./userRoute');
const paperRouter = require('./paper');

const router = express.Router();

router.use(
  expressJWT({
    secret: PRIVATE_KEY, // algorithms: ['RS256'],
    algorithms: ['HS256'],
  }).unless({
    path: whitelist, // ⽩名单,除了这⾥写的地址，其他的URL都需要验证
  }),
);

router.use('/api/website', websiteRouter);
router.use('/api/user', userRouter);
router.use('/api/paper', paperRouter);

// catch 404 and forward to error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.use(function (req, res, next) {
  next(createError(404));
});

export default router;
