// models/jwtToken.js
const mongoose = require('mongoose');

// Define the schema for storing JWT tokens
const jwtTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 // The document will automatically be removed after 1 hour (3600 seconds)
  }
});

const JwtToken = mongoose.model('JwtToken', jwtTokenSchema);

module.exports = JwtToken;