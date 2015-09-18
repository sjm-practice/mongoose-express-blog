'use strict';

var errors = require('./errors.js');
var login = require('./login.js');

module.exports = function (app) {

  // home page
  app.get('/', function (req, res) {
    res.render('home.jade');
  });

  // login & logout routes
  login(app);

  // errors
  errors(app);

};
