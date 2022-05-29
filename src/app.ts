import path = require('path');
import cookieParser = require('cookie-parser');
import cors = require('cors');
import routers from './routes';
import bodyParser = require('body-parser');
import { Express } from 'express';
import express = require('express');
import { defaultErrorHandler } from './middleware/error';
import { scheduleJobs } from './utils/schedule'; // 定时任务
import { PRIVATE_KEY, whitelist } from './config';

const jwt = require('express-jwt');
scheduleJobs();
const port = 9000;

const app: Express = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  jwt
    .expressjwt({
      secret: PRIVATE_KEY,
      algorithms: ['HS256'],
    })
    .unless({
      path: whitelist, // ⽩名单,除了这⾥写的地址，其他的URL都需要验证
    }),
);

app.use('/', routers);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

// error handler
app.use(defaultErrorHandler);

module.exports = app;
