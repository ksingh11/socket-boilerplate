var logger = require('libs').getlogger;


/**
 * Export modules
 */
module.exports = {
    socketHandler: socketHandler
};


/**
 * socket.io connection handler
 * @param io
 */
function socketHandler(io) {
    var numClients = 0;

    io.on('connection', function (socket) {
        logger.debug('socket id: ' + socket.id);
        logger.debug('total sockets:', ++numClients);

        // on client disconnect
        socket.on('disconnect', function () {
            logger.debug('socket disconnected:' + socket.id);
            numClients --;
        })
    });
}
