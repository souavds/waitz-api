const router = require('express').Router();

const { Comment } = require('../controllers');

router.get('/', Comment.getCommentsById);

module.exports = router;
