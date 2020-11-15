const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            maxlength: [50, 'Title must have less or equal then 50 characters'],
            minlength: [3, 'Title must have more or equal then 3 characters'],
        },
        content: {
            type: String,
            trim: true,
            maxlength: [5000, 'Title must have less or equal then 5000 characters'],
            minlength: [100, 'Title must have more or equal then 100 characters'],
        },
        posted: { type: Boolean, default: false },

        author: { type: Schema.ObjectId, ref: 'User', required: true },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

BlogSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'author',
        select: 'username profile_img',
    });
    next();
});

BlogSchema.virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'blogPost',
});

module.exports = mongoose.model('Blog', BlogSchema);
