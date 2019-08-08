const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
  gmId: String,
  placeId: String,
  name: String,
  geometry: {
    location: {
      lat: Number,
      lng: Number
    },
    viewport: {
      east: Number,
      north: Number,
      south: Number,
      west: Number
    }
  },
  vicinity: String,
  queue: {
    geral: { type: Number, default: 0 },
    ortopedia: { type: Number, default: 0 },
    outro: { type: Number, default: 0 }
  }
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;