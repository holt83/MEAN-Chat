const app = require('../../server.js');
const should = require('should');
const mongoose = require('mongoose');
const User = mongoose.model('User');

let user;

describe('User model Unit tests', () => {
  beforeEach((done) => {
    user = new User({
      username: 'testman',
      password: 'password'
    });
    // The done method allows us to tell mocha when database query was done
    // It has no use here, since we just create a user object.
    done();
  });

  describe('Test save method', () => {
    it('Should save user without problems', () => {
      user.save((err) => {
        should.not.exists(err);
      });
    })
  });

  describe('Test authenticate method', () => {
    it('Should fail to authenticate user', () => {
      user.authenticate('wrong password').should.equal(false);
    });
  });

  describe('Test find by username static method', () => {
    it('Should find user testman', () => {
      User.findOneByUsername('testman', (err, user) => {
        should.exist(user);
        user.username.should.equal('testman');
      });
    });
  });

  after((done) => {
    User.remove(() => {
      done();
    });
  });
});




