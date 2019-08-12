const Models = require('../models');

const newCheckIn = async (socket, data) => {
  const checkIn = new Models.CheckIn({
    user_id: data.user,
    place_id: data.place,
    type: data.type,
  });
  await checkIn.save();
  const queueType = `queue.${data.type}`;
  await Models.Place.updateOne({ _id: data.place }, { $inc: { [queueType]: 1 } }, { upsert: true });
  socket.broadcast.emit('newCheckIn', data);
};

module.exports = {
  newCheckIn,
};
