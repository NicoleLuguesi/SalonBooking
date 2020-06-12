const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  lastLogin: Date
}, 
{
  timestamps: {}
  }
);

module.exports = User = mongoose.model('users', UserSchema);