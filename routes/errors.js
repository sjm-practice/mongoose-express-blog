'use strict';

module.exports = function (app) {

  // 404 - not found
  app.use(function (req, res, next) {
    res.status(404);

    if (req.accepts('html')) {
      return res.send("<h2>I'm sorry, I couldn't find that page.</h2>");
    }

    if (req.accepts('json')) {
      return res.json({ error: 'Not found' });
    }

    // default response type
    res.type('txt');
    res.send("Sorry, couldn't find that page.");
  });

  // 500 - internal / system errors
  app.use(function (err, req, res, next) {
    console.log('error at %s\n', req.url, err);
    res.status(500).send('Oops, internal error.');
  });
};
