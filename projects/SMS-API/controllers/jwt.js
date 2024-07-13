





// server.js or your main application file
const express = require('express');
const mongoose = require('mongoose');
const { generateAndStoreJwt } = require('./utils/jwt');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Example route to generate and store JWT
app.post('/login', async (req, res) => {
  const userId = req.body.userId; // Get the user ID from the request

  try {
    const token = await generateAndStoreJwt(userId);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
