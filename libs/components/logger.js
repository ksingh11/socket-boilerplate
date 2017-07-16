var winston = require('winston');
winston.emitErrs = true;


/**
 * @type {winston.Logger}
 */
var winstonLogger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/all-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});


/**
 * @type {{write: morganStream.write}}
 */
var morganStream = {
    write: function(message, encoding){
        winstonLogger.info(message);
    }
};


/**
 * Export logger configs
 */
module.exports = {
    winstonLogger: winstonLogger,
    morganStream: morganStream
};