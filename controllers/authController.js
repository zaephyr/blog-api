const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const { promisify } = require('util');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user: user,
        },
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        username: req.body.username,
        name_first: req.body.name_first,
        name_last: req.body.name_last,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;

    // 1) Check if username and password exist
    if (!username || !password) {
        return next(new AppError('Please provide username and password!', 400));
    }

    // 2) Check if user exists && pasword is correct
    const user = await User.findOne({ username: username }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect username or password', 401));
    }

    //3) If everything is ok, send token to client
    createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    // Getting token and check if its there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You are not logged in!! Please log in to get an access.'), 401);
    }

    //  Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //  Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError('The user belonging to this token does no longer exists'));
    }

    req.user = currentUser;
    next();
});

exports.adminOnly = () => {
    return (req, res, next) => {
        if (!req.user.isAdmin) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};
