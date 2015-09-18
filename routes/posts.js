'use strict';

var loggedIn = require('../middleware/logged_in');
var mongoose = require('mongoose');
var BlogPost = mongoose.model('BlogPost');

module.exports = function (app) {

  //
  // create post
  //
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

      res.redirect('/post/' + post.id);
    });
  });

  //
  // display a post
  //
  app.get('/post/:id', function (req, res, next) {
    // build query, to execute
    var query = BlogPost.findById(req.params.id);
    query.populate('author');   //  uses ref: User in schema

    query.exec(function (err, post) {
      if (err) return next(err);

      if (!post) return next();   // 404

      res.render('post/view.jade', { post: post });
    });
  });
};
