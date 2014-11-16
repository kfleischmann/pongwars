jQuery(document).ready(function($){
    socket = io('pong-wars.com:3000');

    // handle messages
    socket.on('message', function(msg){
        $( "#chat_window" ).append(msg + "<br>");
    });

    // handle init
    socket.on('init', function(msg){
        $( "#debug" ).append('INIT: master=' + msg.master + "<br>");
    });

    $( "#send" ).click(function() {
        message = $( "#message").val();
        $( "#chat_window" ).append(message + "<br>");
        $( "#message").val('');

        socket.emit('message', message);
    });
});