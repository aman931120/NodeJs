const mongoose = require('mongoose');

// Now we are going to make a schema
// This schmea is person Schmea

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chef','waiter','manager'],
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required: true
    }  
});

// create Person Model
const Person = mongoose.model('Person',personSchema)
module.exports = Person;