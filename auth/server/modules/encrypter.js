const bcrypt = require('bcrypt-nodejs');

module.exports = {
	encrypt: encrypt
};

function encrypt(value, respond) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return respond(err);
    bcrypt.hash(value, salt, null, (err, hash) => {
      if (err) return respond(err);
      respond(null, hash);
    });
  });
}
