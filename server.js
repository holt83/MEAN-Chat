process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const configureMongoose = require('./config/mongoose');
const configureExpress = require('./config/express');

const db = configureMongoose();
const app = configureExpress();

const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3000);

server.on('listening', function() {
  console.log('Server listening at http://localhost:3000');
});

// This seems separate from express, so it's places here for now.
// Maybe it should be moved to a socket.js config file?
const messages = require('./app/controllers/messages.controller');
io.on('connection', function(socket) {
  console.log("New client connected");

  // Log when the client disconnects again.
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  // The client uses this event when changing room and is expected to
  // an initial one when first connecting.
  socket.on('new room', function(data) {
    socket.roomId = data.roomId;
  });

  // This socket is for streaming messages, so it's added to the
  // message controller.
  messages.addClient(socket);
});
