const bcrypt = require('bcrypt-nodejs');

module.exports = {
	encrypt: encrypt
};

function encrypt(value, done) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return done(err);
    bcrypt.hash(value, salt, null, (err, hash) => {
      if (err) return done(err);
      done(null, hash);
    });
  });
}
