const router = require('express').Router();

const { User } = require('../controllers');

router.post('/signup', User.signup);

module.exports = router;
