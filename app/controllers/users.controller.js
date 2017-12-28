const User = require('mongoose').model('User');

exports.create = function(req, res, next) {
  const user = new User(req.body);

  user.save((err) => {
    if (err) {
      return next(err);
    }
    else {
      res.status(200).json(user);
    }
  });
};

exports.read = function(req, res) {
  res.status(200).json(req.user);
};

exports.list = function (req, res, next) {
  User.find({}, 'username created', (err, users) => {
    if (err) {
      return next(err);
    }
    else {
      res.status(200).json(users);
    }
  });
};

exports.authenticate = function(req, res, next) {
  const credentials = req.body;
  User.findOneByUsername(credentials.username, (err, user) => {
    if (err) {
      return next(err);
    }
    // If no user was found or password didn't password match, return
    // false to indicate this to client
    else if (!user || !user.authenticate(credentials.password)) {
      res.status(200).json(false);
    }
    // If no error, user was found and password matched, return the
    // user object that was found in mongo. This also indicates to
    // the client, that authentication was successful.
    else {
      res.status(200).json(user);
    }
  });
};

// Parameter middleware.
exports.userByID = function(req, res, next, id) {
  User.findOne({_id: id}, 'username created', (err, user) => {
    if (err) {
      return next(err);
    }
    else {
      req.user = user;
      next();
    }
  });
};

exports.update = function(req, res, next) {
  User.findByIdAndUpdate(req.user.id, req.body, {
    'new': true // Receive the updated document.
  }, (err, user) => {
    if (err) {
      return next(err);
    }
    else {
      res.status(200).json(user);
    }
  });
};

exports.delete = function (req, res, next) {
  req.user.remove(err => {
    if (err) {
      return next(err);
    }
    else {
      res.status(200).json(req.user);
    }
  });
};
