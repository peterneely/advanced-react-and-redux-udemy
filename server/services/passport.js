const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

passport.use(createJwtStrategy());
passport.use(createLocalStrategy());

function createJwtStrategy() {
  const options = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
  };
  return new JwtStrategy(options, (payload, done) => {
    User.findById(payload.sub, (err, user) => {
      if (err) return done(err, false);
      if (!user) return done(null, false);
      return done(null, user);
    });
  });
}

function createLocalStrategy() {
  const options = { usernameField: 'email' };
  return new LocalStrategy(options, (username, password, done) => {
    User.findOne({ email: username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err);
        if (!isMatch) return done(null, false);
        return done(null, user);
      });
    });
  });
}
