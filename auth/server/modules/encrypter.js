const bcrypt = require('bcrypt-nodejs');

module.exports = {
	encrypt: encrypt
};

function encrypt(value, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return callback(err);
    bcrypt.hash(value, salt, null, (err, hash) => {
      if (err) return callback(err);
      callback(null, hash);
    });
  });
}
