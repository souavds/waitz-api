const Models = require('../models/index');

const getCheckIn = async (_, res) => {
  const checkIn = await Models.CheckIn.find();
  return res.json(checkIn)
}

module.exports = {
  getCheckIn
}