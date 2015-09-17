var mongoose = require('mongoose');
var express = require('express');
var routes = require('./routes');

mongoose.connect('mongodb://localhost', function (err) {  // note using default port, so no need to specify
  if (err) throw err;
  console.log('mongoose connected to mongodb!');

  var app = express();

  // set routes
  routes(app);

  // start listening
  app.listen(3000, function () {
    console.log('listening at http://localhost:3000');
  });
});
