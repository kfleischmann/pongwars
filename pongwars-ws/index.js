var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var args = process.argv.slice(2);
if ( args.indexOf('debug') ) {
    console.log = function() {};
    console.info = function() {};
}

clients = [];

io.on('connection', function(socket){
    // user joined
    clients.push(socket);
    console.info('user joined (id=' + socket.id + ').');

    // send initialization data
    master = clients.length == 1;
    init_data = {
        "master": master
    };
    console.info('sending master ' + master + ' to id=' + socket.id + ').');
    socket.emit(init_data);

    if (clients.length == 2) {
        // send start signal
        data = {
            "action": 'start'
        };
        io.emit('message', data);
    }

    // handle disconnection
    socket.on('disconnect', function() {
        var index = clients.indexOf(socket);
        if (index != -1) {
            clients.splice(index, 1);
            console.info('user left (id=' + socket.id + ')');
        }
    });

    // handle messages
    socket.on('message', function(msg){
        console.info('user message (id=' + socket.id + '): ' + msg);

        // stream messages to other client
        for (i = 0; i < clients.length; i++) {
            if (clients[i].id != socket.id) {
                console.info('sending message to id=' + clients[i].id + ': ' + msg);
                clients[i].emit('message', msg);
                break; // we assume only two players at the moment
            }
        }
    });
});

http.listen(3000, function(){
      console.log('listening on *:3000');
});

