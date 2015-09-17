'use strict';

var errors = require('./errors.js');

module.exports = function (app) {

  // home page
  app.get('/', function (req, res) {
    res.render('home.jade');
  });

  // errors
  errors(app);

};
