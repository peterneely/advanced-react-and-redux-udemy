const config = require('../config');
const jwt = require('jwt-simple');
const User = require('../models/user');

module.exports = {
  signin: signin,
  signup: signup
};

function signin(req, res, next) {
  res.send(tokenForUser(req.user));
}

function signup(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) return res.status(422).send({ error: 'You must provide an email and password.' });

  User.findOne({ email: email }, (err, foundUser) => {
    if (err) return next(err);
    if (foundUser) return res.status(422).send({ error: 'Email is already being used.' });
    User.create({ email: email, password: password }, (err, user) => {
      if (err) return next(err);
      res.status(201).json(tokenForUser(user));
    });
  });
}

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  const token = jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
  return { token: token };
}
