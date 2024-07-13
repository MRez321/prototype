const SMS = require('../models/sms');


function generateRandomNumber(digitCount) {
    if (!Number.isInteger(digitCount) || digitCount < 1) {
        throw new Error('Digit count must be a positive integer');
    }

    const min = Math.pow(10, digitCount - 1);
    const max = Math.pow(10, digitCount) - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const meliPayamak = async (phoneNumber) => {
    const domain = 'https://me.pixelstar.ir/';
    const code = generateRandomNumber(4);
    const from = '50002710067713';
    const to = phoneNumber;
    const text = `کد تایید: ${code}
    
    @${domain} #${code}`;

    const data = {
        from: from,
        to: to,
        text: text,
    }

    const api = 'https://console.melipayamak.com/api/send/simple/1f855d72cc674f90a204dd3ac153dbfb';

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };


    try {
        const response = await fetch(api, config);

        const sms = new SMS({
            tel: to,
            code: code,
        });
        const result = await sms.save();
        // reqId(result._id);
        console.log('result after save => ', result);
        return result;
        // res.status(201).json({
        //     message: 'SMS sent Successfully!',
        //     data: data,
        //     text: text,
        // });

    } catch (err) {
        console.log('Failed to send the request to API!!', err);
        // res.status(500).json({
        //     error: 'Failed to send the request to API!',
        // });
    }
}

// function reqId(id) {
//     return id;
// }

exports.payamak = (req, res, next) => {
    console.log('req body => ', req.body);
    console.log('tel => ', req.body.tel);

    meliPayamak(req.body.tel)

    // SMS.findOne({tel: '9015867713'})
        .then(result => {
            res.status(201).json({
                message: 'SMS sent Successfully!',
                reqId: result._id,
                tel: result.tel,
            });
        })
        .catch(err => {
            console.log('Failed to send the request to API!!', err);
            res.status(500).json({
                error: 'Failed to send the request to API!',
            });
        });
}

exports.verifyCode = (req, res, next) => {
    const clientCode = req.body.code;
    let serverCode;

    SMS.findById(req.body.reqId)
        .then(result => {
            serverCode = result.code;
        })
        .then(() => {
            console.log('client =>', clientCode);
            console.log('server =>', serverCode);

            if (+clientCode === serverCode) {
                res.status(200).json({
                    message: 'Successful',
                    redirect: '/userProfile',
                })
            } else {
                res.status(500).json({
                    message: 'verification code is incorrect!',
                }); 
            }
        })
        .catch(err => {
            console.log('Failed to fetch the record!!', err);
            res.status(500).json({
                error: 'Failed to fetch the record!',
            });
        })
}

exports.userProfile = (req, res, next) => {
    res.status(200).json({
        message: 'Logged in Successfuly',

    });
}















async function t(params) {
    const db = await SMS.find();
    const c = await SMS.find().countDocuments();
    
    
    console.log('db =>', db);
    console.log('c =>', c);
    
    const t = await SMS.findById('667db389114a9e259a5a3f8a');
    console.log('t =>', t);
    
}

// t();