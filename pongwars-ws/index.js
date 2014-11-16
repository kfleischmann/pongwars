var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);



io.on('connection', function(socket){
  console.log('new user')
  io.emit('message', { is_master : true});
  socket.on('message', function(msg){
    console.log('message: ' + JSON.stringify(msg));
	
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});


