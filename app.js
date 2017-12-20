var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
//路由模块
var index = require('./routes/index');
var users = require('./routes/users');
var goods = require('./routes/goods');
var manager = require('./routes/manager');

//创建主应用
var app = express();

// view engine setup
//设置模板引擎文件夹
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎的类型
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//当没有favicon.ico文件的时候，serve-favicon会拦截浏览器的favicon请求，如果有的了话，放入public文件夹并将下面的代码取消注释
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//使用插件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ resave:true,secret: 'keyboard cat', cookie: { maxAge: 60000 },saveUninitialized:true}))
//设置静态文件夹
app.use(express.static(path.join(__dirname, 'public')));

// path.join('/a/b','/c/d','/f') => /a/b/c/d/f
// __dirname 当前文件所处的目录绝对地址  C:\1718\week1\day6\web-application\public

//使用路由，当请求的url为 / 的时候   交由index路由来处理
app.use('/', index);
//使用路由，当请求的url为 /users 的时候   交由users路由来处理
app.use('/users', users);
app.use('/goods', goods);
app.use('/manager', manager);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
