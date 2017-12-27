const Message = require('mongoose').model('Message');

exports.create = function(req, res, next) {
  const message = new Message(req.body);

  message.save((err) => {
    if (err) {
      return next(err);
    }
    else {
      res.status(200).json(message);

      // Notify clients.
      notifyClients(req.body.roomId);
    }
  });
};

// This relies on the parameter middleware added in room.routes.js.
exports.list = function(req, res, next) {
  Message.find({ roomId: req.room._id }, 'name message created', (err, messages) => {
    if (err) {
      return next(err);
    }
    else {
      res.status(200).json(messages);
    }
  });
};

exports.update = function(req, res, next) {
  Message.findByIdAndUpdate(req.message._id, req.body, {new: true}, (err, message) => {
    if (err) {
      return next(err);
    }
    else {
      res.status(200).json(message);
    }
  });
};

exports.delete = function(req, res, next) {
  const message = req.message;

  message.remove(err => {
    if (err) {
      return next(err);
    }
    else {
      res.status(200).json(message);
    }
  });
};

// Parameter middleware.
exports.messageById = function(req, res, next, id) {
  Message.findOne({_id: id}, 'name message created', (err, message) => {
    if (err) {
      return next(err);
    }
    else {
      // Passes it along to the controller middleware.
      req.message = message;
      next();
    }
  });
};

// Socket client handling for exchanging messages.
let io;

exports.setupClient = function(client) {
  client.on('join room', function(roomId) {
    // Uses socket.io ROOM API to keep track of which client to push messages to.
    client.join(roomId);
    console.log("A client joined a room with id: " + roomId);
  });
  client.on('leave room', function(roomId) {
    // Uses socket.io ROOM API to keep track of which client to push messages to.
    client.leave(roomId);
    console.log("A client left a room with id: " + roomId);
  });
};

exports.setServer = function(server) {
  io = server;
};

/**
 * Notifies clients in room with roomId of a new message.
 *
 * @param roomId
 */
function notifyClients(roomId) {
  Message.find({ roomId: roomId }, 'name message created', (err, messages) => {
    if (err) { return console.error(err); }
    else {
      io.to(roomId).emit('new message', messages);
    }
  });
}
