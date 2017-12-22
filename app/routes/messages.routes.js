const messages = require('../controllers/messages.controller');

exports.routes = function(app) {
  // Returns the messages for a room.
  app.route('/api/messages/:roomId').get(messages.list);

  // Post new message
  app.route('/api/messages').post(messages.create);

  // Delete/update
  app.route('/api/messages/:messageId');

  // Middleware that is used before any middleware using that param.
  app.param('messageId', messages.messageById);
};

