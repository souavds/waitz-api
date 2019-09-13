const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const UserSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// eslint-disable-next-line func-names
UserSchema.pre('save', function (next) {
  const document = this;
  // Check if document is new or a new password has been set
  if (document.isNew || document.isModified('password')) {
    // Saving reference to this because of changing scopes
    bcrypt.hash(document.password, saltRounds, (err, hash) => {
      if (err) {
        next(err);
      } else {
        document.password = hash;
        next();
      }
    });
  } else {
    next();
  }
});

// eslint-disable-next-line func-names
UserSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, same) => {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
