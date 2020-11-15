const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'A user must have a username'],
        unique: true,
        trim: true,
        maxlength: [15, 'A username must have less or equal then 15 characters'],
        minlength: [3, 'A username must have more or equal then 3 characters'],
    },
    name_first: { type: String, trim: true, minlength: [2, 'A first name must have more or equal then 2 characters'] },
    name_last: { type: String, trim: true, minlength: [2, 'A last name must have more or equal then 2 characters'] },
    email: {
        type: String,
        sparse: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    profile_img: { type: String },
    isAdmin: { type: Boolean, default: true },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        trim: true,
        minlength: [8, 'A password must have more or equal then 8 characters'],
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please provide a password'],
        trim: true,
        validate: {
            // This only works on CREATE and SAVE!!!
            validator: function (val) {
                return val === this.password;
            },
            message: 'Passwords do not match',
        },
    },
});

UserSchema.virtual('messages', {
    ref: 'Message',
    foreignField: 'user',
    localField: '_id',
});

UserSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    // return await bcrypt.compare(candidatePassword, userPassword);
    return candidatePassword == userPassword;
};

module.exports = mongoose.model('User', UserSchema);
