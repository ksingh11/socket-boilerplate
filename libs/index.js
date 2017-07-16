var winstonLogger = require('./components/logger').winstonLogger;
var morganStream = require('./components/logger').morganStream;

/**
 * Export modules from: config/components
 */
module.exports = {
    winstonLogger: winstonLogger,
    morganStream: morganStream
};