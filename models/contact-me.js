const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactMeSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        // creator: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true,
        // },
    }, 
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('ContactMe', contactMeSchema);