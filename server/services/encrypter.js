const bcrypt = require('bcrypt-nodejs');

module.exports = {
  compare: compare,
  encrypt: encrypt
};

function compare(value1, value2, done) {
  bcrypt.compare(value1, value2, (err, isMatch) => {
    if (err) return done(err);
    done(null, isMatch);
  });
}

function encrypt(value, done) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return done(err);
    bcrypt.hash(value, salt, null, (err, hash) => {
      if (err) return done(err);
      done(null, hash);
    });
  });
}
