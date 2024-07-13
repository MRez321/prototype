const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
 const authController = require('../controllers/auth');

const Router = express.Router();

const postReqValidator = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('E-Mail adress already exists!');
                }
            })
        })
        .normalizeEmail(),

    body('password')
        .trim()
        .isLength({ min: 5 }),

    body('name')
        .trim()
        .not()
        .isEmpty(),
]


Router.put('/signup', postReqValidator, authController.signup);

Router.post('/login', authController.login);


module.exports = Router;