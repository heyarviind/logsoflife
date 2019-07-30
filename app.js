const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const indexRouter = require('./routes/index');
const logRouter = require('./app/log/Routes');
const userRouter = require('./app/user/Routes')

const app = express();

mongoose.connect('mongodb://localhost:27017/logsoflife');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// CORS
app.use(async function(req, res, next) {

  var allowedOrigins = [
  	'http://localhost:8080',
  	'http://127.0.0.1:8080',
    'http://127.0.0.1:3000',
    'http://192.168.1.3:8080',
    'https://logsoflife.netlify.com'
  ];

  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/', indexRouter);
app.use('/', logRouter);
app.use('/', userRouter);

module.exports = app;