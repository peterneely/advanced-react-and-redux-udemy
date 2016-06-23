const User = require('../models/user');

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser) return res.status(422).send({ error: 'Email is already being used.' });
    User.create({ email: email, password: password }, (err) => {
      if (err) return next(err);
      res.status(201).json({ success: true });
    });
  });
}
