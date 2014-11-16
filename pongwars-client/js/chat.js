jQuery(document).ready(function($){
    socket = io('pong-wars.com:3000');

    // handle messages
    socket.on('message', function(msg){
        //console.log('got message: ' + msg);

        $( "#chat_window" ).append(msg + "<br>");
    });

    $( "#send" ).click(function() {
        message = $( "#message").val();
        $( "#chat_window" ).append(message + "<br>");
        $( "#message").val('');

        socket.emit('message', message);
    });
});