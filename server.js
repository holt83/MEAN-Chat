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

// This seems separate from express, so it's placed here for now.
// Maybe it should be moved to a socket.js config file?
const messages = require('./app/controllers/messages.controller');
io.on('connection', function(socket) {
  console.log("New client connected");

  // Log when the client disconnects and tell messages controller to remove it.
  socket.on('disconnect', function(){
    console.log('user disconnected');
    messages.removeClient(socket.id);
  });

  // The client uses this event when changing room and is expected to
  // send an initial one when first connecting.
  socket.on('join-room', function(roomId) {
    socket.roomId = roomId;
    console.log("A client joined a room with id: " + roomId);
  });

  // This socket is for streaming messages, so it's added to the
  // message controller, which will notify client when new message
  // are added.
  messages.addClient(socket);
});
