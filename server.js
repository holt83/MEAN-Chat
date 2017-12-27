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

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  // Let message controller setup events for joining/leaving chat rooms.
  messages.setupClient(socket);
});
// Message controller also need to emit new message events when messages
// are added to rooms.
messages.setServer(io);
