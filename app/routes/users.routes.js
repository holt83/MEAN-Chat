const users = require('../controllers/users.controller');

exports.routes = function(app) {
  app.route('/api/users/authenticate').post(users.authenticate);

  app.route('/api/users')
    .post(users.create)
    .get(users.list);

  app.route('/api/users/:userId')
    .get(users.read)
    .put(users.update)
    .delete(users.delete);

  // .param() : Defines middleware that is used before any middleware using that param.
  app.param('userId', users.userByID);
};
