'use strict';

var mongoose = require('mongoose');

// define the schema
var schema = mongoose.Schema({
  title: { type: String, trim: true },
  created: { type: Date, default: Date.now },
  body: String,
  author: { type: String, ref: 'User' }
});

// extend the functionality of a blogpost
//  -by adding the mongoose-lifecycle npm package, additional
//   methods can be added to the schema using the plugin method
//  -mongoose-lifecycle adds lifecycle events on the model class
//      beforeInsert, afterInsert, beforeUpdate, ...
var lifecycle = require('mongoose-lifecycle');
schema.plugin(lifecycle);

// compile the schema
var Post = mongoose.model('BlogPost', schema);

// handle events for model class
Post.on('afterInsert', function (post) {
  // note afterInsert event, provided by mongoose-lifecycle package

  var url = 'http://localhost:3000/posts/';
  console.log('New blogpost at: %s%s', url, post.id);
});
