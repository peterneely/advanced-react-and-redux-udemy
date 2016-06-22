const sinon = require('sinon');
const request = require('supertest');
const User = require('../models/user');

describe('authentication', () => {

  describe('signup', () => {
    let server;
    let user;
    let UserStub;

    before((done) => {
      server = require('../index');
      done();
    });

    beforeEach((done) => {
      user = { email: 'test@test.com', password: '123' };
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
      UserStub.findOne.yields(null, null);
      UserStub.create.returns({ save: sinon.stub().callsArg[0] });
      request(server).post('/signup').send(user).expect(200, done);
    });

    it('should return an error if a user with the given email already exists', (done) => {
      UserStub.findOne.yields(null, user);
      request(server).post('/signup').send(user).expect(422, done);
    });

    // it('should return an error if the database connection fails', () => {

    // });
  });
});
