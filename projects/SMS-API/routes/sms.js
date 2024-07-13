const express = require('express');
// const { body } = require('express-validator');

const SMS = require('../models/sms');
const smsController = require('../controllers/sms');

const Router = express.Router();

// const postReqValidator = [
//     body('email')
//         .isEmail()
//         .withMessage('Please enter a valid email.')
//         .custom((value, { req }) => {
//             return User.findOne({ email: value }).then(userDoc => {
//                 if (userDoc) {
//                     return Promise.reject('E-Mail adress already exists!');
//                 }
//             })
//         })
//         .normalizeEmail(),

//     body('password')
//         .trim()
//         .isLength({ min: 5 }),

//     body('name')
//         .trim()
//         .not()
//         .isEmpty(),
// ]


// Router.post('/sms', smsController.payamak);

Router.post('/payamak', smsController.payamak);

Router.post('/verifyCode', smsController.verifyCode);

Router.get('/userProfile', smsController.userProfile);




module.exports = Router;