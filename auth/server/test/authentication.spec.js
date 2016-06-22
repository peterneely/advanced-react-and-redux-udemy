const request = require('supertest');

// require('../models/user');
// const chai = require('chai')
// const should = chai.should();
const mongoose = require('mongoose');
const server = require('../index');

const mockgoose = require('mockgoose');
// mockgoose(mongoose);
mockgoose(mongoose).then(() => {
	mongoose.connect('mongodb://localhost:authTest/authTest', (err) => {
		done(err);
	});
});

// const User = mongoose.model('User');
// const ObjectId = mongoose.Types.ObjectId();

describe('authentication', () => {

  describe('signup', () => {

    beforeEach((done) => {
      mockgoose.reset(() => {
        done();
      });
    });

    afterEach((done) => {
      server.close();
      mockgoose.reset(() => {
        done();
      });
    });

    it('should create and save the record if a user with the given email does not exist', (done) => {
      const user = { email: 'test@test.com', password: '123' };
      request(server).post('/signup').send(user).expect({ success: true }, done);
    });

    it('should return an error if a user with the given email already exists', (done) => {
      const user = { email: 'test@test.com', password: '123' };
      request(server).post('/signup').send(user).expect({ success: true }, () => {
      	request(server).post('/signup').send(user).expect(422, done);
      });      
    });

    // it('should return an error if the database connection fails', () => {

    // });
  });
});
