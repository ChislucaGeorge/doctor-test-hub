const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  recoveryEmail: { type: String },
  profilePicture: { type: String, default: '' } 
});

module.exports = mongoose.model('User', UserSchema);
