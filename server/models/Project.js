// adding schema - https://stackoverflow.com/a/52641897

const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  //_id: mongoose.Schema.ObjectId,
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  attachment: {
    type: String,
  },
  clientID: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  tickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket'
    }   
  ],
  assignee: [
    {
      type: String,
    }
  ],
  status: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
