const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
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
      type: String,
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
