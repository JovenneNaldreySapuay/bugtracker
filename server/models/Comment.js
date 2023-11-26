const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  ticketID: {
    type: String,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
