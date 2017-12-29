const app = require('../../server');
const request = require('supertest');
const should = require('should');
const mongoose = require('mongoose');
const User = mongoose.model('User');

let user;
let credentials;

describe('User controller Unit tests', () => {
  beforeEach((done) => {
    user = new User({
      username: 'testman',
      password: 'password'
    });

    user.save((err) => {
      done();
    });
  });

  describe('Testing the GET user method', () => {
    it('Should be able to return a user specified by id', (done) => {
      request(app).get('/api/users/' + user._id)
        .set('Accept', 'application/json')
        .expect('Content-type', '/json/')
        .expect(200)
        .end((err, res) => {
          res.body.should.be.an.Object();
          res.body.should.have.property('username', user.username);
          // The user returned from API has a date string.
          res.body.should.have.property('created', user.created.toISOString());

          done();
        });
     });
  });

  describe('Testing the PUT update user method', () => {
    it('Should be able to update a user specified by id', (done) => {
      request(app).put('/api/users/' + user._id)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({ username: 'testman2' })
        .expect('Content-type', '/json/')
        .expect(200)
        .end((err, res) => {
          res.body.should.be.an.Object();
          res.body.should.have.property('username', 'testman2');
          res.body.should.have.property('created', user.created.toISOString());

          done();
        });
    });
  });

  describe('Testing the authenticate method', () => {
    before((done) => {
      credentials = new User({
        username: 'testman',
        password: 'password'
      });
      done();
    });

    it('Should be able to authenticate our test user', (done) => {
      request(app).post('/api/users/authenticate')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(credentials)
        .expect('Content-type', '/json/')
        .expect(200)
        .end((err, res) => {
          res.body.should.be.an.Object();
          res.body.should.have.property('username', user.username);
          res.body.should.have.property('created', user.created.toISOString());

          done();
        });
     });
  });

  // Clean up.
  afterEach((done) => {
    User.remove(() => {
      done();
    });
  });
});
