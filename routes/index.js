module.exports = function (app) {

  app.get('/', function (req, res) {
    res.status(200).send( 'hello mongoose blog!');
  });

};
