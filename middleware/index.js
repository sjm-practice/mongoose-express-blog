'use strict';

var express = require('express');
var logger = require('./logger');
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
