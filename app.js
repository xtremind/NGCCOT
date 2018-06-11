var express = require("express"),
  app = express(),
  http = require("http").Server(app),
  winston = require('winston');

var env = process.env.NODE_ENV || "development";


var config = winston.config;
logger = new (winston.Logger)({
  level: env == "development" ? 'debug' : 'info',
  transports: [
    new (winston.transports.Console)({
      timestamp: function () {
        return Date.now();
      },
      formatter: function (options) {
        return new Intl.DateTimeFormat('fr-FR', {
          year: 'numeric', month: '2-digit', day: '2-digit',
          hour: '2-digit', minute: '2-digit', second: '2-digit',
          hour24: true
        }).format(options.timestamp()) + ' ' +
          config.colorize(options.level, options.level.toUpperCase()) + ' ' +
          (options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
      }
    })
  ]
});

//logger.debug("Mode " + process.env.NODE_ENV );

// Serve up index.html.
app.use('/js', express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/src'));

var server_port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

http.listen(server_port, null, function () {
  logger.info("Server Started");
  logger.debug("Listening on " + this._connectionKey);
});

//redirect client part
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/src/index.html');
});
