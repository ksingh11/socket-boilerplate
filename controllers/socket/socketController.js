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
    io.on('connection', function (socket) {
        console.log('socket id: ' + socket.id);
    });
}