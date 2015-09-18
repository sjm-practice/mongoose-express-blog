'use strict';

module.exports = function (s) {
  if (typeof s != 'string') {
    s = '';
  }

  return s.trim();
};
