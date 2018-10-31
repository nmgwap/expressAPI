// 导入模块
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 导入接口api
var User = require('./api/User');
var UserData = require('./api/UserData');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// 模版引擎替换成html
var ejs = require('ejs');
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//在文件第三行插入下面这句话
app.use('/', express.static('public'));

// 设置用户接口api
app.use('/user', User);
app.use('/userData', UserData);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render('error');
    res.send({ "success": false, "data": {}, "msg": "请求地址不存在" });
});

module.exports = app;