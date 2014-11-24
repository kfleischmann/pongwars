var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var args = process.argv.slice(2);
if ( args.indexOf('debug') ) {
    console.log = function() {};
    console.info = function() {};
}

clients = []; // holds client sockets
masters = []; // holds socket id of master

var random_event = function(){
	seed = new Date().getTime();
	data = {
		"seed": seed
	};
	io.emit('random_event', data );
	console.info("send random event with seed "+seed);
	next=Math.floor((Math.random() * 10000) + 1);
	setTimeout( random_event, next );
};
setTimeout( random_event, 1000 );

io.on('connection', function(socket){
    // user joined
    clients.push(socket);
    console.info('user joined (id=' + socket.id + ').');

    // send initialization data
    if (master = masters.length == 0) {
        masters.push(socket.id);
    }
    init_data = {
        "master": master,
    };
    console.info('sending master ' + master + ' to id=' + socket.id + ').');
    socket.emit('init', init_data);

    if (clients.length == 2) {
        // send start signal
        data = {
            "action": 'start'
        };
        console.info('sending start to all');
        io.emit('action', data);
    }

    // handle disconnection
    socket.on('disconnect', function() {
        // remove client from clients
        var index = clients.indexOf(socket);
        if (index != -1) {
            clients.splice(index, 1);
            console.info('user left (id=' + socket.id + ')');
        }

        // remove client from masters
        var index = masters.indexOf(socket.id);
        if (index != -1) {
            masters.splice(index, 1);
            console.info('cleaning master (id=' + socket.id + ')');
        }

        // send stop signal
        data = {
            "action": 'stop'
        };
        console.info('sending stop to all');
        io.emit('action', data);

        if (clients.length == 0) {
            // reset seed
            seed = new Date().getTime();
        }
    });

    // handle messages
    socket.on('message', function(msg){
        console.info('user message (id=' + socket.id + '): ');
        console.log(msg);

        // stream messages to other client
        for (i = 0; i < clients.length; i++) {
            if (clients[i].id != socket.id) {
                console.info('sending message to id=' + clients[i].id + ': ');
                console.log(msg);

                clients[i].emit('message', msg);
                break; // we assume only two players at the moment
            }
        }
    });

    // handle echo messages
    socket.on('echo', function(msg){
        console.info('echo message (id=' + socket.id + '): ');
        console.log(msg);

        // stream messages back to client
        console.info('echo message back to id=' + socket.id + ': ');
        console.log(msg);

        socket.emit('echo', msg);
    });
});

http.listen(3000, function(){
      console.log('listening on *:3000');
});


