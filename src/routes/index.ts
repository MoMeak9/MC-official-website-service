import express = require('express');

const createError = require('http-errors');
// Routes
// const usersRouter = require('../routes/users');
const websiteRouter = require('./websiteRoute');
const userRouter = require('./userRoute');
const paperRouter = require('./paperRoute');

const router = express.Router();

router.use('/api/website', websiteRouter);
router.use('/api/user', userRouter);
router.use('/api/paper', paperRouter);

// catch 404 and forward to error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.use(function (req, res, next) {
  next(createError(404));
});

export default router;
