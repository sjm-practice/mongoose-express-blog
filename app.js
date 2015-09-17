var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost', function (err) {  // note using default port, so no need to specify
  if (err) throw err;

  console.log('connected!');
  mongoose.disconnect();
});
