const router = require('express').Router();

const { Place } = require('../controllers');

router.get('/nearby', Place.getNearbyPlaces)

module.exports = router;