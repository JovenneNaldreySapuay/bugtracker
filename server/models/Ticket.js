const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  ticketType: {
    type: String,
  },
  status: {
    type: String,
  },
  priority: {
    type: String,
  },
  assignee: [
    {
      type: String,
    }
  ],
  comments: [
    {
      type: String,
    }
  ],
  attachments: [
    {
      type: String,
    }
  ],
  submitter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', TicketSchema);
