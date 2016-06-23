const User = require('../models/user');

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) return res.status(422).send({ error: 'You must provide an email and password.' });

  User.findOne({ email: email }, (err, foundUser) => {
    if (err) return next(err);
    if (foundUser) return res.status(422).send({ error: 'Email is already being used.' });
    User.create({ email: email, password: password }, (err) => {
      if (err) return next(err);
      res.status(201).json({ success: true });
    });
  });
}
