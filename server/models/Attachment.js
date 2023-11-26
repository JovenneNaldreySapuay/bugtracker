const mongoose = require('mongoose');

const AttachmentSchema = new mongoose.Schema({
  filename: {
    type: String,
  },
  filesize: {
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

module.exports = mongoose.model('Attachment', AttachmentSchema);
