const express = require('express');

const googleAuthController = require('../controllers/google-auth');

const Router = express.Router();


Router.get('/', googleAuthController.homePage);

Router.get('/auth/google', googleAuthController.authGoogle);

Router.get('/auth/google/callback', googleAuthController.authGoogleCallback);

Router.get('/profile', googleAuthController.profile);


module.exports = Router;