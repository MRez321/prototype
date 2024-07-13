const express = require('express');

const portfController = require('../controllers/portfolio');
const authorized = require('../middleware/authorized');

const Router = express.Router();

Router.post('/contactForm', authorized, portfController.contactForm);

module.exports = Router;