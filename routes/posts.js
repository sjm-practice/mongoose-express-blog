'use strict';

var loggedIn = require('../middleware/logged_in');

module.exports = function (app) {

  // create post
  app.get('/post/create', loggedIn, function (req, res) {
    res.render('post/create.jade');
  });
};
