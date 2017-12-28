const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true, // This is an index (primary).
    required: true // Pre-defined validator.
  },
  password: {
    type: String,
    // Custom validator.
    validate: [
      function (password) {
        return password.length >= 4;
      },
      'Password should be longer'
    ]
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// Custom static method.
UserSchema.statics.findOneByUsername = function (username, callback) {
  this.findOne({ username: username }, callback);
};

// Custom instance method; Acts on an instance of the model.
UserSchema.methods.authenticate = function (password) {
  return this.password === password;
};

mongoose.model('User', UserSchema);
