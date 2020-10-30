const Message = require('../models/messageModel');
const factory = require('./handlerFactory');

exports.setBlogUserIds = (req, res, next) => {
    if (!req.body.blog) req.body.blog = req.params.blogId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
};

exports.getAllMessages = factory.getAll(Message);
exports.getMessage = factory.getOne(Message);
exports.createMessage = factory.createOne(Message);
exports.updateMessage = factory.updateOne(Message);
exports.deleteMessage = factory.deleteOne(Message);
