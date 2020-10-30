const express = require('express');
const messageController = require('../controllers/messageController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(messageController.getAllMessages).post(authController.protect, messageController.createMessage);

router
    .route('/:id')
    .get(messageController.getMessage)
    .patch(authController.protect, messageController.updateMessage)
    .delete(authController.protect, messageController.deleteMessage);
module.exports = router;
