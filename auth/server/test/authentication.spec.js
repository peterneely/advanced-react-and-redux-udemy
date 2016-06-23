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
      userFake = { email: 'test@test.com', password: '123' };
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
      var noUser = null;
      UserStub.findOne.yields(noErr, noUser);
      UserStub.create.withArgs(userFake).yields(noErr);
      request(server).post('/signup').send(userFake).expect(201).expect({ success: true }, done);
    });

    it('should return an error if a user with the given email already exists', (done) => {
      UserStub.findOne.yields(noErr, userFake);
      request(server).post('/signup').send(userFake).expect(422, done);
    });

    // it('should return an error if the database connection fails', () => {

    // });
  });
});
