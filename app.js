var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var defaultRouter = require('./routes/default');
var hikesRouter = require('./routes/hikes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/hikes', hikesRouter);
app.use('*', defaultRouter);

module.exports = app;
