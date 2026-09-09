const User = require('../models/User');
const jwt = require('jsonwebtoken');
const ApiResponse = require('../utils/apiResponse');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json(new ApiResponse(400, null, 'User already exists'));
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    const token = generateToken(user._id);

    res.status(201).json(new ApiResponse(201, {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    }, 'User registered successfully'));
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(new ApiResponse(400, null, 'Please provide an email and password'));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json(new ApiResponse(401, null, 'Invalid credentials'));
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json(new ApiResponse(401, null, 'Invalid credentials'));
    }

    const token = generateToken(user._id);

    res.status(200).json(new ApiResponse(200, {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    }, 'Login successful'));
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(new ApiResponse(200, user, 'Current user data fetched successfully'));
  } catch (error) {
    next(error);
  }
};
