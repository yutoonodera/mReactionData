"use strict";
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index'); // 変更箇所
var usersRouter = require('./routes/users');
//MVR用なのでhpでは不要
const cors = require('cors');
var app = express();
//MVR用なのでhpでは不要
app.use(cors());
// view engine setup
app.set('views', path.join('views')); // 変更箇所
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join('public'))); // 変更箇所
//public/ ディレクトリ内の静的ファイルを提供するための設定
app.use(express.static('public'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).send('MRDを検討中の方は、movee<a href="https://movee.jp/">ホームページ</a>からお問い合わせください');
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
