// const agenda = require('../config/agenda');
const cron = require('cron');
const date = require('date.js');

const Models = require('../models');
const verifyToken = require('../utils/verifyToken');

const newCheckIn = async (io, socket, data) => {
  if (verifyToken(data.token, data.user)) {
    const hasAlreadyCheckIn = await Models.CheckIn.findOne({ user: data.user, active: true });
    if (!hasAlreadyCheckIn) {
      const checkIn = new Models.CheckIn({
        user: data.user,
        place_id: data.place,
        type: data.type,
      });
      await checkIn.save();
      const queueType = `queue.${data.type}`;
      await Models.Place.updateOne(
        { _id: data.place },
        { $inc: { [queueType]: 1 } },
        { upsert: true },
      );
      socket.broadcast.emit('newCheckIn', data);
      const job = new cron.CronJob(
        date('in 30 seconds'),
        async () => {
          Models.CheckIn.findOneAndUpdate(
            { user: data.user, active: true },
            { active: false, updated_at: Date.now() },
            async (err, doc) => {
              if (doc) {
                // eslint-disable-next-line max-len
                await Models.Place.updateOne(
                  { _id: data.place },
                  { $inc: { [queueType]: -1 } },
                  { upsert: true },
                );
                socket.emit('chekInNotActive');
                io.emit('checkout', data);
              }
              job.stop();
            },
          );
        },
        null,
        true,
      );
    } else {
      socket.emit('userAlreadyHasCheckIn', data);
    }
  } else {
    socket.emit('invalidToken');
  }
};

const newCheckOut = async (io, socket, data) => {
  const { user, token } = data;
  if (verifyToken(token, user)) {
    Models.CheckIn.findOneAndUpdate(
      { user, active: true },
      { active: false, updated_at: Date.now() },
      async (err, doc) => {
        if (doc) {
          const queueType = `queue.${doc.type}`;
          await Models.Place.updateOne(
            { _id: doc.place_id },
            { $inc: { [queueType]: -1 } },
            { upsert: true },
          );
          io.sockets.emit('checkout', { place: doc.place_id, type: doc.type, user: data.user });
        }
      },
    );
  } else {
    socket.emit('invalidToken');
  }
};

module.exports = {
  newCheckIn,
  newCheckOut,
};
