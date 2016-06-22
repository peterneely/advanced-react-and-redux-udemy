const Authentication = require('./controllers/authentication');

module.exports = (app) => {
  app.get('/signup', Authentication.signup);
}
