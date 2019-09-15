// const agenda = require('../config/agenda');
const cron = require('cron');
const date = require('date.js');

const Models = require('../models');

const newCheckIn = async (io, socket, data) => {
  const checkIn = new Models.CheckIn({
    user: data.user,
    place_id: data.place,
    type: data.type,
  });
  await checkIn.save();
  const queueType = `queue.${data.type}`;
  await Models.Place.updateOne({ _id: data.place }, { $inc: { [queueType]: 1 } }, { upsert: true });
  socket.broadcast.emit('newCheckIn', data);
  const job = new cron.CronJob(
    date('in 10 seconds'),
    async () => {
      await checkIn.updateOne({ active: false });
      // eslint-disable-next-line max-len
      await Models.Place.updateOne(
        { _id: data.place },
        { $inc: { [queueType]: -1 } },
        { upsert: true },
      );
      io.emit('checkout', data);
      job.stop();
    },
    null,
    true,
  );
};

module.exports = {
  newCheckIn,
};
