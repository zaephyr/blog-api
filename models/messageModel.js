const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message: {
        type: String,
        trim: true,
        maxlength: [512, 'A tour review must have less or equal then 512 characters'],
        minlength: [4, 'A tour review must have more or equal then 4 characters'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    blogPost: {
        type: mongoose.Schema.ObjectId,
        ref: 'Blog',
        required: [true, 'Message must belong to a blog post.'],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Message must belong to a user.'],
    },
});

module.exports = mongoose.model('Message', MessageSchema);
