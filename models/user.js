'use strict';

var mongoose = require('mongoose');
var validEmail = require('../helpers/validate/email');

var schema = mongoose.Schema({
  _id: { type: String, lowercase: true, trim: true, validate: validEmail },
  name: { first: String, last: String },
  salt: { type: String, required: true },
  hash: { type: String, required: true },
  created: { type: Date, default: Date.now }
  // if you want an index created by MongoDB for a field, set index to true
  // created: { type: Date, default: Date.now, index: true }
});

// module.exports = mongoose.model('User', schema);
mongoose.model('User', schema);
