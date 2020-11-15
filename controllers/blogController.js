const Blog = require('../models/blogModel');
const factory = require('./handlerFactory');

exports.getAllBlogs = factory.getAll(Blog, { posted: true });
exports.getBackLog = factory.getAll(Blog, { posted: false });
exports.getBlog = factory.getOne(Blog, 'messages');
exports.createBlog = factory.createOne(Blog);
exports.updateBlog = factory.updateOne(Blog);
exports.deleteBlog = factory.deleteOne(Blog);
