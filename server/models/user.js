const encrypter = require('../services/encrypter');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

userSchema.methods.comparePassword = comparePassword;

userSchema.pre('save', encryptPassword);

module.exports = mongoose.model('user', userSchema);

function comparePassword(candidatePassword, done) {
  const user = this;
  encrypter.compare(candidatePassword, user.password, done);
}

function encryptPassword(next) {
  const user = this;
  encrypter.encrypt(user.password, (err, encrypted) => {
    if (err) return next(err);
    user.password = encrypted;
    next();
  });
}
