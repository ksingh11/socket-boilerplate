"use strict";

/**
 * Add root directory to the search path, should be very first import
 * allow imports from anywhere using relative path originating from root
 */
require('app-module-path').addPath(__dirname);


/**
 * Set root directory name with global '__base__' variable.
 * can be accessed from anywhere
 */
global.__base__ = __dirname + '/';


/**
 * Import modules
 * @type {*|exports|module.exports}
 */
var express = require('express');
var http = require('http');
var socketIO = require('socket.io');
var config = require('config');
var morgan = require('morgan');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var logger = require('libs').winstonLogger;


/**
 * Initialize server with express app.
 * Also, intercept socket.io path
 */
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


/**
 * Add Middlewares
 */
app.use(morgan('short', {"stream": require('config').morganStream}));
app.use(helmet());
app.all('/*', require('./middlewares/headerRules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('./public'));


/**
 * Plug Express Routers here
 */
app.use('/', require('./controllers/webapp'));


/**
 * Plug socket.io app here
 * pass 'io', socket.io initialized object
 */
require('./controllers/socket').socketHandler(io);


/**
 * Default fallback handle: 404 Not Found
 */
app.use(function(req, res, next){
    var err = new Error(req.originalUrl+' Not Found');
    res.status(404).json({"status": 404, "message": err.message});
});


/**
 * Default fallback handle: 500 Server Error
 */
app.use(function(err, req, res, next){
    res.status(500).json({"status": 500, "message": "Server Error: " + err.message});
});


/**
 * Start http server
 */
var port = config.get('serverConfig.port');
server.listen(port, function(){
    logger.debug("Server is up and running at port " + port);
});
