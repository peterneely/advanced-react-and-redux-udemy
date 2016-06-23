const request = require('supertest');
const sinon = require('sinon');
const User = require('../models/user');

describe('authentication', () => {

  describe('signup', () => {
    const noErr = null;
    let server;
    let userFake;
    let UserStub;

    before((done) => {
      server = require('../index');
      done();
    });

    beforeEach((done) => {
      UserStub = {
        create: sinon.stub(User, 'create'),
        findOne: sinon.stub(User, 'findOne')
      };
      done();
    });

    after((done) => {
      server.close();
      done();
    });

    afterEach((done) => {
      UserStub.create.restore();
      UserStub.findOne.restore();
      done();
    });

    it('should create and save the record if a user with the given email does not exist', (done) => {
      var user = { email: 'test@test.com', password: '123' };
      var noUser = null;
      UserStub.findOne.yields(noErr, noUser);
      UserStub.create.withArgs(user).yields(noErr);
      request(server).post('/signup').send(user).expect(201).expect({ success: true }, done);
    });

    it('should encrypt the password when the user is created', (done) => {
      done();
    });

    it('should return an error if a user with the given email already exists', (done) => {
      var user = { email: 'test@test.com', password: '123' };
      UserStub.findOne.yields(noErr, user);
      request(server).post('/signup').send(user).expect(422, done);
    });

    it('should return an error if the user does not have an email', (done) => {
      var user = { password: '123' };
      request(server).post('/signup').send(user).expect(422, done);
    });

    it('should return an error if the user does not have a password', (done) => {
      var user = { email: 'test@test.com' };
      request(server).post('/signup').send(user).expect(422, done);
    });

    // it('should return an error if the database connection fails', () => {

    // });
  });
});
