// const gmaps = require('../config/gmaps');
const Models = require('../models');

const getNearbyPlaces = async (req, res) => {
  // const gmapsRes = await gmaps.placesNearby({
  //   location: [req.query.lat, req.query.lng],
  //   radius: 50000,
  //   type: 'hospital'
  // }).asPromise()
  // .then((response) => {
  //   return response.json.results
  // })
  // .catch((err) => {
  //   return err;
  // });

  // const gmaps_ids = [];
  // gmapsRes.map(place => {
  //   gmaps_ids.push(place.id);
  // });

  // const placesInDB = await Models.Place.find({ gmaps_id: { $in: gmaps_ids } });

  // const placesNotInDB = [];
  // const toSentPlaces = [...placesInDB];
  // if (placesInDB.length === 0) {
  //   gmapsRes.map(place => {
  //     const newPlace = {
  //       gmaps_id: place.id,
  //       reference: place.reference,
  //       name: place.name,
  //       geometry: {...place.geometry},
  //       rating: place.rating,
  //       vicinity: place.vicinity,
  //     }
  //     placesNotInDB.push(newPlace);
  //   })
  //   await Models.Place.create(placesNotInDB, (err, array) => {
  //     if (array) {
  //       toSentPlaces.push(...array);
  //     }
  //   });
  // }

  // return res.json(toSentPlaces);
  const places = await Models.Place.find();
  return res.json(places);
};

module.exports = {
  getNearbyPlaces,
};
