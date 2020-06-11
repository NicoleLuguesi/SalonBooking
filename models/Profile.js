const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String, 
    required: true 
  },
  social: {
    facebook: {
      type: String, 
      required: true
    },
    instagram: {
      type: String 
    },
    twitter: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }

});

module.exports = Profile = mongoose.model('profile', ProfileSchema)