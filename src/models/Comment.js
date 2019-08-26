const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  user_id: String,
  place_id: String,
  text: String,
  date: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
