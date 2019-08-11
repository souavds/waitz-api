const gmaps = require('@google/maps');

const gmapsClient = gmaps.createClient({
  key: process.env.GMAPS_KEY,
  Promise: Promise
});

module.exports = gmapsClient;