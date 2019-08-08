const router = require('express').Router();

const Controllers = require('../controllers/index');

router.get('/', Controllers.CheckIn.getCheckIn)

module.exports = router;