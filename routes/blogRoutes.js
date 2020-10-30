const express = require('express');
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');

const router = express.Router();

router
    .route('/')
    .get(blogController.getAllBlogs)
    .post(authController.protect, authController.adminOnly(), blogController.createBlog);

router
    .route('/:id')
    .get(blogController.getBlog)
    .patch(authController.protect, authController.adminOnly, blogController.updateBlog)
    .delete(authController.protect, authController.adminOnly, blogController.deleteBlog);

module.exports = router;
