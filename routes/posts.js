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

  //
  // delete post
  //
  app.get('/post/remove/:id', loggedIn, function (req, res, next) {
    var postId = req.params.id;

    BlogPost.findOne({ _id: postId }, function (err, post) {
      if (err) return next(err);

      // validate logged in user is author of this post
      if (post.author != req.session.user) {
        return res.sendStatus(403);
      }

      // TODO should display a confirmation message here
      post.remove(function (err) {
        if (err) return next(err);
        res.redirect('/');
      });
    });
  });
};
