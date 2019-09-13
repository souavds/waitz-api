/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const Models = require('../models');

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const user = new Models.User({ username, email, password });
  Models.User.findOne({ $or: [{ username }, { email }] }, (err, doc) => {
    if (doc) {
      const msg = doc.username === username ? 'Username already in use.' : 'Email already in use.';
      res.status(500).send({
        message: msg,
      });
    } else {
      user.save((error) => {
        if (error) {
          res.status(500).send({
            message: 'Error trying to signup.',
          });
        } else {
          res.status(200).send({
            message: 'User registered successfully!',
            user: {
              // eslint-disable-next-line no-underscore-dangle
              _id: user._id,
              username: user.username,
              email: user.email,
            },
          });
        }
      });
    }
  });
};

const signin = async (req, res) => {
  const { username, email, password } = req.body;
  Models.User.findOne({ $or: [{ username }, { email }] }, (err, user) => {
    if (err) {
      res.status(500).send({
        error: 'Internal error please try again.',
      });
    } else if (!user) {
      res.status(401).send({
        error: 'Incorrect username/email or password.',
      });
    } else {
      user.isCorrectPassword(password, (error, same) => {
        if (error) {
          res.status(500).send({
            error: 'Internal error please try again.',
          });
        } else if (!same) {
          res.status(401).send({
            error: 'Incorrect username/email or password.',
          });
        } else {
          // Issue token
          const payload = { id: user._id, username: user.username, email: user.email };
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '24h',
          });
          res.status(200).send({
            success: true,
            token,
          });
        }
      });
    }
  });
};

module.exports = {
  signup,
  signin,
};
