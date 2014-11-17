jQuery(document).ready(function($){
    socket = io('pong-wars.com:3000');

    // receive messages
    socket.on('echo', function(msg){
        now = new Date().getTime();
        time_diff_rtt = (now - msg.start_time) / 1000;
        $( "#debug" ).append('received: ' + msg.seq + " - " + time_diff_rtt + "<br>");
    });

    $( "#test_rtt" ).click(function() {
        bytes = 512;

        // send messages
        for (i=0 ; i<1000 ; i++) {
            setTimeout( send_message, i*250, i);
        }
    });
});

function send_message(i) {
    message = {
        "seq": i,
        "start_time": new Date().getTime(),
        "data": new Array(bytes + 1).join('a')
    };

    socket.emit('echo', message);
    $( "#debug" ).append('sent: ' + message.seq + "<br>");
}