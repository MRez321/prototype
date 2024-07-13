
const ContactMe = require('../models/contact-me');

exports.contactForm = async (req, res, next) => {
    const name = req.body.fullName;
    const email = req.body.email;
    const tel = req.body.telNumber;
    const title = req.body.subject;
    const content = req.body.textContent;


    const data = {
        name : name,
        email: email,
        tel: tel,
        title: title,
        content: content,
    }
    console.log('form data => ', data);

    const contactData = new ContactMe({
        fullName: name,
        email: email,
        phoneNumber: tel,
        title: title,
        content: content,
    });
    const result = await contactData.save();

    console.log('result => ',result);

    // res.send(JSON.stringify({
    //     message: 'data recived succesfully!',
    //     data: data,
    // }));
}
