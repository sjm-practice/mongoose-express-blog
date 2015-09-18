'use strict';

var mongoose = require('mongoose');
var express = require('express');

// add mongoose query and promise support to express
require('express-mongoose');

var models = require('./models');
var routes = require('./routes');
var middleware = require('./middleware');

mongoose.connect('mongodb://localhost/m101js', function (err) {  // note using default port, so no need to specify
  if (err) throw err;
  console.log('mongoose connected to mongodb!');

  var app = express();
  middleware(app);
  routes(app);

  // start listening
  app.listen(3000, function () {
    console.log('listening at http://localhost:3000');
  });
});
