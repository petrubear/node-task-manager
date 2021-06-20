const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
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
        unique: true,
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

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});

    if (!user) {
        throw new Error('unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('unable to login');
    }
    return user;
};


userSchema.pre('save', async function(next) {
    // eslint-disable-next-line no-invalid-this
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model('User', userSchema);

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
