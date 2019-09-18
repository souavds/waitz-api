const mongoose = require('mongoose');

const CheckInSchema = mongoose.Schema({
  user: String,
  place_id: String,
  type: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});

const CheckIn = mongoose.model('CheckIn', CheckInSchema);

module.exports = CheckIn;
