const encrypter = require('../modules/encrypter');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

userSchema.pre('save', encryptPassword);

userSchema.methods.comparePassword = comparePassword;

// function comparePassword(candidatePassword, callback) {
//   bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//     if (err) return callback(err);
//     callback(null, isMatch);
//   });
// }

module.exports = mongoose.model('user', userSchema);

function comparePassword(candidatePassword, done) {
  const password = this.password;
  encrypter.compare(candidatePassword, password, done);
}

function encryptPassword(next) {
  const user = this;
  encrypter.encrypt(user.password, (err, encrypted) => {
    if (err) return next(err);
    user.password = encrypted;
    next();
  });
}
