const Models = require('../models');

const newComment = async (socket, data) => {
  const comment = new Models.Comment({
    user_id: data.user_id,
    place_id: data.place_id,
    text: data.text,
  });
  await comment.save();
  socket.broadcast.emit('newComment', comment);
};

module.exports = {
  newComment,
};
