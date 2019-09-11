const mongoose = require('mongoose');

const CheckInSchema = mongoose.Schema({
  user_id: String,
  place_id: String,
  type: String,
  date: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});

const CheckIn = mongoose.model('CheckIn', CheckInSchema);

module.exports = CheckIn;
