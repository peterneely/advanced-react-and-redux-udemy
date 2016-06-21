var request = require('supertest');
var server;

describe('authentication', () => {

  describe('signup', () => {

  	beforeEach(() => {
  		server = require('../index');
  	});

  	afterEach(() => {
  		server.close();
  	});

    it('should see if a user with the given email exists', (done) => {
    	request.get
    });

    // it('should return an error if a user with the given email does exist', () => {

    // });

    // it('should create and save the record if a user with the given email does not exist', () => {

    // });

    // it('should respond to the request indicating that the user was created', () => {

    // });
  });
});
