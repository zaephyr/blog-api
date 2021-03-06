const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This route is not for password updates. Please use /updatePassword', 400));
    }

    const filteredBody = filterObj(req.body, 'username', 'name_first', 'name_last', 'email', 'profile_img');
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, { new: true, runValidators: true });

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser,
        },
    });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id);
    res.status(204).json({
        status: 'success',
        data: null,
    });
});

// exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);

exports.userExists = catchAsync(async (req, res, next) => {
    const doc = User.findOne({ username: req.params.username });
    const user = await doc;

    if (!user) {
        return next(new AppError('No user found with that username', 404));
    }

    res.status(200).json(user);
});

//Do NOT update passwords with THIS!!!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
