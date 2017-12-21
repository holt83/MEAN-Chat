const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    index: true, // Secondary index.
    match: /.+\@.+\..+/ // Pre-defined validator using a regex.
  },
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
        return password.length >= 6;
      },
      'Password should be longer'
    ]
  },
  created: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ['Admin', 'Owner', 'User'] // Enum validator
  },
  website: {
    type: String,
    // Custom getter modifier.
    get: function(url) {
      if (url && url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
        url = 'http://' + url;
      }
      return url;
    }
  }
});

// Custom static method.
UserSchema.statics.findOneByUsername = function (username, callback) {
  this.findOne({ username: new RegExp(username, 'i')}, callback);
};

// Custom instance method; Acts on an instance of the model.
UserSchema.methods.authenticate = function (password) {
  return this.password === password;
};

// Virtual field.
UserSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
}).set(function (fullName) {
  const splitName = fullName.split(' ');
  this.firstName = splitName[0] || '';
  this.lastName = splitName[1] || '';
});

// If we didn't do this, Mongoose would ignore our setter modifiers
// and virtual fields.
UserSchema.set('toJSON', { getters: true, virtuals: true });

mongoose.model('User', UserSchema);
