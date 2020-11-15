var express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const blogController = require('../controllers/blogController');

var router = express.Router();

router.get('/me', authController.protect, userController.getMe, userController.getUser);
router.get('/me/blogs', blogController.getBackLog);
router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router.get('/:username', userController.userExists);

module.exports = router;
