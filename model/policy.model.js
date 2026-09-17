const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Privacy Policy', 'Terms and Condition', 'Shipping Policy', 'Return and Refund Policy', 'Cancellation Policy', 'About Us', 'App Version'],
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

const policyModel = mongoose.model('Policy', policySchema);
module.exports = policyModel;
