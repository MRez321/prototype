require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const {v4 : uuid} = require('uuid');
// const multer = require('multer');

const smsRoutes = require('./routes/sms');
// const authRoutes = require('./routes/auth');
const googleAuthRoutes = require('./routes/google-auth');
const pixelstarRoutes = require('./routes/pixelstar');

const port = process.env.PORT || 2121;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('images', express.static(path.join(__dirname, 'public', 'img')));

// const getRandomNumber = (min, max) => {
//     return Math.floor(Math.random() * (max - min) + min);
// }

// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         // cb(null, 'images');
//         cb(null, 'public/img');
//     },
//     filename: (req, file, cb) => {
//         // cb(null, uuid() + ' - ' + file.originalname);
//         cb(null, `${getRandomNumber(1, 100)}-${file.originalname}`);
//     },
// });

// const fileFilter = (req, file, cb) => {
//     console.log('req file =>', req.file);
//     console.log('req files =>', req.files);
//     if (
//         file.mimetype === 'image/png' || 
//         file.mimetype === 'image/jpg' || 
//         file.mimetype === 'image/jpeg' ||
//         file.mimetype === 'image/webp' 
//     ) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }
// const upload = multer({
//     storage: fileStorage, 
//     fileFilter: fileFilter
// });
// app.use(upload.single('image'));


// app.use((req, res, next) => {
//     res.setHeader(
//         'Access-Control-Allow-Origin', 
//         'https://me.pixelstar.ir/, *'
//     );
//     res.setHeader(
//         'Access-Control-Allow-Methods', 
//         'GET, POST, PUT, PATCH, DELETE'
//     );
//     res.setHeader(
//         'Access-Control-Allow-Headers', 
//         'Content-Type, Content-Length, Authorization'
//     );
//     next();
// });


app.use(smsRoutes);
app.use(googleAuthRoutes);
app.use(pixelstarRoutes);
// app.use('/auth', authRoutes);



app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({message: message, data: data});
});



mongoose.connect(`${process.env.LIARA_DB}`)
.then(result => {
    console.log('connected to mongodb');

    app.listen(port, () => console.log(`Server running on Port ${port}`, `=> http://localhost:${port}/`));

})
.catch(err => console.log(err));