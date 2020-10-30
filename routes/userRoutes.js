var express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

var router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/me', authController.protect, userController.getMe);
router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router.route('/:id').get(userController.getUser);

module.exports = router;
