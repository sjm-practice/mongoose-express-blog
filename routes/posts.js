'use strict';

var loggedIn = require('../middleware/logged_in');
var mongoose = require('mongoose');
var BlogPost = mongoose.model('BlogPost');

module.exports = function (app) {

  // create post
  app.get('/post/create', loggedIn, function (req, res) {
    res.render('post/create.jade');
  });

  app.post('/post/create', loggedIn, function (req, res, next) {
    var body = req.body.body;
    var title = req.body.title;
    var user = req.session.user;

    BlogPost.create({
      body: body,
      title: title,
      author: user
    }, function (err, post) {
      if (err) return next(err);

      // res.redirect('/post/' + post.id);
      res.redirect('/');
    });
  });
};
