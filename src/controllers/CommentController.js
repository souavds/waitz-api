const Models = require('../models');

const getCommentsById = async (req, res) => {
  // eslint-disable-next-line camelcase
  const { place_id } = req.query;
  const comments = await Models.Comment.find({ place_id });
  return res.json(comments);
};

module.exports = {
  getCommentsById,
};
