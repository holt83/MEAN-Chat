const config = require('./config');
const mongoose = require('mongoose');

module.exports = function() {
  mongoose.connect(config.db, { useMongoClient: true });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("We're connected to the database through mongoose!")
  });

  require('../app/models/user.model');
  require('../app/models/room.model');
  require('../app/models/message.model');

  return db;
};
