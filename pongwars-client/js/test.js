jQuery(document).ready(function($){
    socket = io('pong-wars.com:3000');

    // handle messages
    socket.on('message', function(msg){
        console.log('got message: ' + msg);
    });

    $( "#send" ).click(function() {
        socket.emit('message', "TEST TEST TEST");
    });
});