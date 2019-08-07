const mongoose = require('mongoose');

const checkInSchema = mongoose.Schema({
  user: String,
  place: {
    name: String,
    location: {
      lat: Number,
      lng: Number
    }
  },
  date: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

const CheckIn = mongoose.model('CheckIn', checkInSchema);

module.exports = { CheckIn };