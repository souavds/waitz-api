const router = require('express').Router();

const { User } = require('../controllers');

router.post('/register', User.signup);
router.post('/authenticate', User.signin);

module.exports = router;
