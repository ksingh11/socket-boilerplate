/**
 * Created by kaushal on 16/07/17.
 */

(function(){

    //initialize socket connection
    var socket = io();

    // socket on connection established
    socket.on('connect', function() {
        console.log(socket);
        document.getElementById('client_id').innerHTML = socket.id;
    })
}());
