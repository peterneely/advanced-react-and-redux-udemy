const User = require('../models/user');

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser) return res.status(422).send({ error: 'Email is already being used.' });
    // const user = new User({
    //   email: email,
    //   password: password
    // });
    // user.save((err) => {
    //   if (err) return next(err);
    //   console.log('got here');
    //   res.json({ success: true });
    // });
    User.create({ email: email, password: password }, (err) => {
      if (err) return next(err);
      res.json({ success: true });
    });
  });
}
