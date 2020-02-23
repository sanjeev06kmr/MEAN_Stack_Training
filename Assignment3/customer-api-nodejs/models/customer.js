const mongoose = require('mongoose');

// Customer Schema
const customerSchema = mongoose.Schema({
    name :{type : String, required : true},
    gender :{type : String, required : true},
    email :{type : String, required : true},
    address :{type : String},
    city :{type : String},
    state :{type : String},
    country :{type : String},
    imageUrl :{type : String},
    hobbies :{type : String}
});

// Model
mongoose.model('customers', customerSchema);

// Export Customer Model
module.exports = mongoose.model('customers');