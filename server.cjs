require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { v4: uuid } = require('uuid');


const port = process.env.PORT || 2121;
const app = express();


const portfolioRoutes = require('./routes/portfolio');
const pixelstarRoutes = require('./routes/pixelstar');



const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        // cb(null, new Date().toISOString() + '-' + file.originalname);
        // cb(null, file.originalname);
        cb(null, uuid() + ' - ' + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    console.log('req file =>', req.file);
    console.log('req files =>', req.files);
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/webp'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: fileStorage,
    fileFilter: fileFilter
});
app.use(upload.single('image'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);
// app.use(authRoutes);

// app.get('/500', errorController.get500);

// app.use(errorController.get404);


app.use((req, res, next) => {
    res.setHeader(
        'Access-Control-Allow-Origin', 
        '*'
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Content-Type, Authorization'
    );
    next();
});



app.use(portfolioRoutes);
app.use(pixelstarRoutes);


app.get('/test', (req, res, next) => {

    res.status(200).json({
        message: 'Fetched successfuly.',
        imageUrl: '/img/hossien-github.jpg',
    });

});





app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({ message: message, data: data });
});


mongoose.connect(`${process.env.LIARA_DB}`)
.then(result => {
    console.log('connected to mongodb');

    app.listen(port, () => console.log(`Server running on Port ${port}`, `=> http://localhost:${port}/`));

})
.catch(err => console.log(err));