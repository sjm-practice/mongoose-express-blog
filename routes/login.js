'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

var cleanString = require('../helpers/clean_string');
var hash = require('../helpers/hash');
var crypto = require('crypto');

module.exports = function (app) {

  //
  // sign up
  //
  app.get('/signup', function (req, res) {
    res.render('signup.jade');
  });

  app.post('/signup', function (req, res, next) {

    // verify valid email and password provided
    var email = cleanString(req.body.email);
    var pass = cleanString(req.body.pass);
    if (!(email && pass)) {
      return invalid();
    }

    // make sure this user doesn't already exist
    User.findById(email, function (err, user) {
      if (err) return next(err);

      // if a user is found, send them back to sign up page
      if (user) {
        return res.render('signup.jade', { exists: true });
      }

      // new user, so generate salt and password hash
      crypto.randomBytes(16, function (err, bytes) {
        if (err) return next(err);

        var user = { _id: email };
        user.salt = bytes.toString('utf8');
        user.hash = hash(pass, user.salt);

        User.create(user, function (err, newUser) {
          if (err) {
            if (err instanceof mongoose.Error.ValidationError) {
              return invalid();
            }
            return next(err);
          }

          // user created, store session info
          req.session.isLoggedIn = true;
          req.session.user = newUser._id;
          console.log('created user:', newUser._id);

          return res.redirect('/');
        });
      });
    });

    function invalid() {
      return res.render('signup.jade', { invalid: true });
    }
  });

  //
  // login
  //
  app.get('/login', function (req, res) {
    res.render('login.jade');
  });

  app.post('/login', function (req, res, next) {
    // validate input
    var email = cleanString(req.body.email);
    var pass = cleanString(req.body.pass);
    if (!(email && pass)) {
      return invalid();
    }

    email = email.toLowerCase();
    User.findById(email, function (err, user) {
      if (err) return next(err);

      if (!user) {
        return invalid();
      }

      // a valid user found, check password
      if (user.hash != hash(pass, user.salt)) {
        return invalid();
      }

      // valid user and password, so save their session info (log them in)
      req.session.isLoggedIn = true;
      req.session.user = email;
      res.redirect('/');
    });

    function invalid() {
      return res.render('login.jade', { invalid: true });
    }
  });

  //
  // logout
  //
  app.get('/logout', function (req, res) {
    req.session.isLoggedIn = false;
    req.session.user = null;
    res.redirect('/');
  });

};
