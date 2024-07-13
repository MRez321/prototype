// utils/jwt.js
const jwt = require('jsonwebtoken');
const JwtToken = require('../models/jwt');

const secretKey = 'your_secret_key'; // Use a secure key in production

// Function to generate and store JWT
const generateAndStoreJwt = async (userId) => {
  // Generate a JWT
  const token = jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' });

  // Create a new JwtToken document
  const jwtToken = new JwtToken({
    token
  });

  // Save the token to the database
  await jwtToken.save();

  return token;
};

module.exports = {
  generateAndStoreJwt
};