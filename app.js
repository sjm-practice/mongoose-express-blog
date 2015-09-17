var mongoose = require('mongoose');
var express = require('express');

mongoose.connect('mongodb://localhost', function (err) {  // note using default port, so no need to specify
  if (err) throw err;
  console.log('connected!');

  var app = express();

  // set routes
  app.get('/', function (req, res) {
    res.status(200).send('hello mongoose blog!');
  });

  // start listening
  app.listen(3000, function () {
    console.log('listening at http://localhost:3000');
  });
});
