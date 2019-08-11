const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  userId: String,
  placeId: String,
  text: String,
  queue: {
    type: String,
    myNumber: Number,
    currentNumber: Number,
    aheadNumber: Number
  },
  date: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;