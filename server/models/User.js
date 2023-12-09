const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String, 
    required: true, 
    lowercase: true, 
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  company: {
    type: String,
    default: "" 
  },
  website: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },
  role: {
    type: String,
  },
  subscription: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

 

