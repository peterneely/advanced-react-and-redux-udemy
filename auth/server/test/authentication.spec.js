// require = require('really-need');
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
      request(server).get('/signup').expect(200, done);
    });

    it('404 everything else', (done) => {
      console.log('test 404')
      request(server).get('/foo/bar').expect(404, done);
    });

    // it('should return an error if a user with the given email does exist', () => {

    // });

    // it('should create and save the record if a user with the given email does not exist', () => {

    // });

    // it('should respond to the request indicating that the user was created', () => {

    // });
  });
});
