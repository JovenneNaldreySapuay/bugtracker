const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
