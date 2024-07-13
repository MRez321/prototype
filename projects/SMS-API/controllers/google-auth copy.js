require('dotenv').config();
// const express = require('express');
const { google } = require('googleapis');
const jwt = require('jsonwebtoken');

// exports.

// const app = express();
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/auth/google/callback'
);

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Login with Google</a>');
});

app.get('/auth/google', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/userinfo.profile'],
  });
  res.redirect(url);
});

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: 'v2',
  });

  oauth2.userinfo.get((err, response) => {
    if (err) {
      return res.status(500).send('Authentication error');
    }

    const user = response.data;
    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.redirect(`/profile?token=${token}`);
  });
});

app.get('/profile', (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.redirect('/');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }

    res.send(`Hello ${decoded.user.name}`);
  });
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
