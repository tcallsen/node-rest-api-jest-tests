import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import defaultRouter from './routes/default.js';
import hikesRouter from './routes/hikes.js';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/hikes', hikesRouter);
app.use('*', defaultRouter);

// register custom error handling middleware
app.use(function (err, req, res, next) {
  res.status(err.status).send(err.message);
});

export default app;
