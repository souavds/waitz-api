const mongoose = require('mongoose');

const checkInSchema = mongoose.Schema({
  user_id: String,
  place_id: String,
  date: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

const CheckIn = mongoose.model('CheckIn', checkInSchema);

module.exports = CheckIn;