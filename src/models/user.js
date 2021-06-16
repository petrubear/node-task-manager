const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid');
            }
        },
    },
    age: {
        type: Number,
        required: false,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password should not contain password');
            }
        },
    },
});

/*
const me = new User({
    name: 'Edison',
    email: 'edison.martinez@gmail.COM ',
    age: 39,
    password: 'abcdef',
});

me.save().then((result) => {
    console.log(result);
}).catch((error) => {
    console.log('Error: ', error);
});
*/

module.exports = User;
