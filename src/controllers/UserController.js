const Models = require('../models');

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = new Models.User({ email, password });
  Models.User.findOne({ email }, (err, doc) => {
    if (doc) {
      res.status(500).send({
        message: 'Email already in use.',
      });
    } else {
      user.save((error) => {
        if (error) {
          res.status(500).send({
            message: 'Error trying to signup.',
          });
        } else {
          res.status(200).send({
            message: 'User registered!',
            user: {
              // eslint-disable-next-line no-underscore-dangle
              _id: user._id,
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
};
