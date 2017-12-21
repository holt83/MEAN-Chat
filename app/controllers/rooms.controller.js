const Room = require('mongoose').model('Room');

exports.create = function(req, res, next) {
  const room = new Room(req.body);

  room.save((err) => {
    if (err) {
      return next(err);
    }
    else {
      res.status(200).json(room);
    }
  });
};

exports.list = function(req, res, next) {
  Room.find({}, 'title description created', (err, rooms) => {
    if (err) {
      return next(err);
    }
    else {
      res.status(200).json(rooms);
    }
  });
};

exports.read = function(req, res) {
  res.status(200).json(req.room);
};

exports.update = function(req, res, next) {
  Room.findByIdAndUpdate(req.room._id, req.body, {new: true}, (err, room) => {
    if (err) {
      return next(err);
    }
    else {
      res.status(200).json(room);
    }
  });
};

exports.delete = function(req, res, next) {
  room = req.room;

  room.remove(err => {
    if (err) {
      return next(err);
    }
    else {
      res.status(200).json(room);
    }
  });
};

// Parameter middleware.
exports.roomById = function(req, res, next, id) {
  Room.findOne({_id: id}, 'title description created', (err, room) => {
    if (err) {
      return next(err);
    }
    else {
      // Passes it along to the controller middleware.
      req.room = room;
      next();
    }
  });
};
