/*
Creating our own middleware (module)

This middleware will log the request type and duration.
*/
module.exports = function (request, response, next) {
  var start = +new Date(),      // '+' converts the date object to a number of milliseconds
      stream = process.stdout,  // a writeable stream, standard out (much like console.log)
                                // NOTE: console.log really just calls stdout after doing some formatting
      url = request.url,
      method = request.method;

  // NOTE, the response object is an event emitter
  // so to know when the response actually has completed (after other middleware etc)
  // we can listen for the 'finish' event, and log our message then
  response.on('finish', function () {
    var duration = +new Date() - start,
        message = method + ' to ' + url + '\ntook ' + duration + ' ms \n\n';

    stream.write(message);
  });
  // docs for response events, http://nodejs.org/api/http.html#http_event_finish

  next();  // moves the request to the next middleware in the stack
};