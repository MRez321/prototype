

const PixelStar = require('../models/pixelstar');

exports.pixelstar = async (req, res, next) => {

    // const referer = req.headers.referer || req.headers.referrer;
    // console.log('Request made from:', referer);
    
    // Your API logic here


    res.status(200).json({
        message: 'Request received.',
        imageUrl: '/img/pixelstar.png',
    });

}
