/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const Models = require('../models');

const expiresIn = '24h';

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const user = new Models.User({ username, email, password });
  Models.User.findOne({ $or: [{ username }, { email }] }, (err, doc) => {
    if (err) {
      res.status(500).send({
        error: 'Internal error please try again.',
      });
    } else if (doc) {
      let errors = {};
      if (doc.username === username && doc.email === email) {
        errors = {
          email: 'Email already in use.',
          username: 'Username already in use.',
        };
      } else {
        errors = doc.username === username
          ? { username: 'Username already in use.' }
          : { email: 'Email already in use.' };
      }
      res.status(401).send({
        errors,
      });
    } else {
      user.save((error) => {
        if (error) {
          res.status(500).send({
            error: 'Error trying to signup.',
          });
        } else {
          const payload = { id: user._id, username: user.username, email: user.email };
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn,
          });
          res.status(200).send({
            message: 'User registered successfully!',
            token,
            user: {
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
  const { identifier, password } = req.body;
  Models.User.findOne({ $or: [{ username: identifier }, { email: identifier }] }, (err, user) => {
    if (err) {
      res.status(500).send({
        error: 'Internal error please try again.',
      });
    } else if (!user) {
      res.status(401).send({
        errors: {
          identifier: "Couldn't find this email or username.",
        },
      });
    } else {
      user.isCorrectPassword(password, (error, same) => {
        if (error) {
          res.status(500).send({
            error: 'Internal error please try again.',
          });
        } else if (!same) {
          res.status(401).send({
            errors: {
              password: 'Password incorrect.',
            },
          });
        } else {
          const payload = { id: user._id, username: user.username, email: user.email };
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn,
          });
          res.status(200).send({
            message: 'Signed in successfully!',
            token,
            user: {
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

module.exports = {
  signup,
  signin,
};
