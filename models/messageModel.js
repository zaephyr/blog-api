const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        message: {
            type: String,
            trim: true,
            maxlength: [512, 'A message must have less or equal then 512 characters'],
            minlength: [4, 'A message must have more or equal then 4 characters'],
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        blogPost: {
            type: Schema.ObjectId,
            ref: 'Blog',
            required: [true, 'Message must belong to a blog post.'],
        },
        user: {
            type: Schema.ObjectId,
            ref: 'User',
            required: [true, 'Message must belong to a user.'],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

MessageSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'username profile_img',
    });
    next();
});

module.exports = mongoose.model('Message', MessageSchema);
