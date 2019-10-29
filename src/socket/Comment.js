const cron = require('cron');
const date = require('date.js');

const Models = require('../models');
const verifyToken = require('../utils/verifyToken');

const newComment = async (io, socket, data) => {
  if (verifyToken(data.token, data.user)) {
    const comment = new Models.Comment({
      user: data.user,
      place_id: data.place_id,
      text: data.text,
    });
    await comment.save();
    io.emit('newComment', comment);
    const job = new cron.CronJob(
      date('in 30 seconds'),
      async () => {
        await comment.updateOne({ active: false });
        // eslint-disable-next-line no-underscore-dangle
        io.emit('removeComment', { place: data.place_id, comment: comment._id });
        job.stop();
      },
      null,
      true,
    );
  } else {
    socket.emit('invalidToken');
  }
};

module.exports = {
  newComment,
};
