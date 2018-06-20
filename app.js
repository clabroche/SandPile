var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const controller = require('./src/index.js')

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/cells', function (request, response, next) {
  // console.log('cell')
  response.status(200).json(controller.sandBox.get());
})

app.get('/cellsToRender', function (request, response, next) {
  response.status(200).json(controller.sandBox.cellsToRender);
  cellsToRender = {};
})
app.get('/colors', function (request, response, next) {
  response.status(200).json(controller.colors);
});
app.post('/start', function (request, response, next) {
  controller.sandBox.start()
  response.status(200).json(controller.sandPile);
});
app.post('/stop', function (request, response, next) {
  controller.sandBox.stop()
  response.status(200).json(controller.sandPile);
});

app.post('/save', function (request, response, next) {
  controller.sandBox.save()
  response.status(200).json(controller.sandPile);
});

app.post('/restore', function (request, response, next) {
  controller.sandBox.restore()
  response.status(200).json(controller.sandPile);
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;