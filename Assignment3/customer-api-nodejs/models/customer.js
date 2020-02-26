const mongoose = require('mongoose');

// Customer Schema
const customerSchema = mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'] },
    gender: { type: String, required: true },
    //email :{type : String, required : [true, 'Why no bacon?']},
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return customEmailValidator(v);
            },
            message: props => `${props.value} is not a valid EmailId!`
        },
        required: [true, 'EmailId is required']
    },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    imageUrl: { type: String },
    hobbies: { type: String }
});

// Model
mongoose.model('customers', customerSchema);

// Email Validator
function customEmailValidator(v) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(v);
}

// Export Customer Model
module.exports = mongoose.model('customers');

