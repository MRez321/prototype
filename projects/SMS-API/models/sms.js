const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const smsSchema = new Schema(
    {
        tel: {
            type: Number,
            required: true,
        },
        code: {
            type: Number,
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

module.exports = mongoose.model('SMS', smsSchema);