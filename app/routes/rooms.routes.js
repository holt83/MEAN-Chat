const rooms = require('../controllers/rooms.controller');

exports.routes = function(app) {
  app.route('/api/rooms')
    .post(rooms.create)
    .get(rooms.list);

  app.route('/api/rooms/:roomId')
    .get(rooms.read)
    .put(rooms.update)
    .delete(rooms.delete);

  // Middleware that is used before any middleware using that param.
  app.param('roomId', rooms.roomById);
};
