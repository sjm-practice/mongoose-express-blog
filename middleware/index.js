'use strict';

var express = require('express');

// note, the lessons use middleware previously provided by express.
// those are no longer supported via express (perhaps since node 4.0?), and
// need to be explicitly installed (or use similar packages)
var logger = require('./logger');   // a simple logger created in a codeschool node course
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var randomString = require('random-string');

module.exports = function (app) {
  app.use(logger);

  // simple persistant sessions (better to connect-mongo or similar)
  app.use(cookieParser());

  app.use(session({
    resave: false,
    saveUninitialized: false,
    genid: function () {
      return randomString({length: 20});
    },
    secret: 'building a blog' }));

  app.use(bodyParser.urlencoded({extended: false}));

  // expose session to views, by creating a simple custom middleware
  // function to store session in a custom/local value in response
  app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
  });
};
