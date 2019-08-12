const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
  gmaps_id: String,
  reference: String,
  name: String,
  geometry: {
    location: {
      lat: Number,
      lng: Number,
    },
    viewport: {
      northeast: {
        lat: Number,
        lng: Number,
      },
      southwest: {
        lat: Number,
        lng: Number,
      },
    },
  },
  rating: { type: Number, default: 0 },
  vicinity: String,
  queue: {
    geral: { type: Number, default: 0 },
    ortopedia: { type: Number, default: 0 },
    outro: { type: Number, default: 0 },
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
