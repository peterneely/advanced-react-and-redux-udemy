const encrypter = require('../modules/encrypter');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

userSchema.pre('save', encryptPassword);

module.exports = mongoose.model('user', userSchema);

function encryptPassword(next) {
  const user = this;
  encrypter.encrypt(user.password, (err, encrypted) => {
    if (err) return next(err);
    user.password = encrypted;
    next();
  });
  // bcrypt.genSalt(10, (err, salt) => {
  //   if (err) return next(err);
  //   bcrypt.hash(user.password, salt, null, (err, hash) => {
  //     if (err) return next(err);
  //     user.password = hash;
  //     next();
  //   });
  // });
}
