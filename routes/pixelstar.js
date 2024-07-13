const express = require('express');

const pixelstarController = require('../controllers/pixelstar');
const authorized = require('../middleware/authorized');

const Router = express.Router();

Router.get('/pixelstar', authorized, pixelstarController.pixelstar);

module.exports = Router;