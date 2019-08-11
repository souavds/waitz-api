const ObjectId = require('mongoose').Types.ObjectId; 
const Models = require('../models');

const newCheckIn = async (socket, data) => {
  const checkIn = new Models.CheckIn({
    user_id: data.user,
    place_id: data.place,
    type: data.type
  });
  checkIn.save(() => {
    socket.broadcast.emit('newCheckIn', data.place)
  });
  const queueType = `queue.${data.type}`;
  const query = await Models.Place.updateOne(
    { _id: data.place },
    { $inc: { [queueType]: 1 } },
    { upsert: true }
  );
};

module.exports = {
  newCheckIn
};