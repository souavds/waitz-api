const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  user_id: String,
  place_id: String,
  text: String,
  date: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
