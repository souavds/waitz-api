const router = require('express').Router();

const { Auth } = require('../controllers');

router.post('/signup', Auth.signup);
router.post('/signin', Auth.signin);

module.exports = router;
