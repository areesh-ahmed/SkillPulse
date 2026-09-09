const Trainee = require('../models/Trainee');
const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');

// @desc    Create trainee profile
// @route   POST /api/trainees
// @access  Private (trainee)
exports.createTraineeProfile = async (req, res, next) => {
  try {
    const { educationLevel, district, contactNumber, dateOfBirth } = req.body;

    if (req.user.role !== 'trainee') {
      return res.status(403).json(new ApiResponse(403, null, 'Only trainees can create a trainee profile'));
    }

    const existingProfile = await Trainee.findOne({ user: req.user.id });
    if (existingProfile) {
      return res.status(400).json(new ApiResponse(400, null, 'Trainee profile already exists for this user'));
    }

    // Generate a simple SkillPulse ID
    const skillPulseId = `SP-${Math.floor(100000 + Math.random() * 900000)}`;

    const trainee = await Trainee.create({
      user: req.user.id,
      educationLevel,
      district,
      contactNumber,
      dateOfBirth,
      skillPulseId,
    });

    res.status(201).json(new ApiResponse(201, trainee, 'Trainee profile created successfully'));
  } catch (error) {
    next(error);
  }
};

// @desc    Get current trainee profile
// @route   GET /api/trainees/me
// @access  Private (trainee)
exports.getMe = async (req, res, next) => {
  try {
    const trainee = await Trainee.findOne({ user: req.user.id }).populate('user', 'name email');
    if (!trainee) {
      return res.status(404).json(new ApiResponse(404, null, 'Trainee profile not found'));
    }
    res.status(200).json(new ApiResponse(200, trainee, 'Trainee profile fetched successfully'));
  } catch (error) {
    next(error);
  }
};

// @desc    Update trainee profile
// @route   PUT /api/trainees/me
// @access  Private (trainee)
exports.updateTraineeProfile = async (req, res, next) => {
  try {
    const { educationLevel, district, contactNumber, dateOfBirth } = req.body;

    let trainee = await Trainee.findOne({ user: req.user.id });
    if (!trainee) {
      return res.status(404).json(new ApiResponse(404, null, 'Trainee profile not found'));
    }

    trainee.educationLevel = educationLevel || trainee.educationLevel;
    trainee.district = district || trainee.district;
    trainee.contactNumber = contactNumber || trainee.contactNumber;
    trainee.dateOfBirth = dateOfBirth || trainee.dateOfBirth;

    await trainee.save();

    res.status(200).json(new ApiResponse(200, trainee, 'Trainee profile updated successfully'));
  } catch (error) {
    next(error);
  }
};

// @desc    Get all trainees (Search/Filter)
// @route   GET /api/trainees
// @access  Private (government, training_provider, employer)
exports.getTrainees = async (req, res, next) => {
  try {
    const { district, educationLevel, search } = req.query;

    let query = {};

    if (district) {
      query.district = district;
    }
    if (educationLevel) {
      query.educationLevel = educationLevel;
    }
    if (search) {
      query.skillPulseId = { $regex: search, $options: 'i' };
    }

    const trainees = await Trainee.find(query).populate('user', 'name email');

    res.status(200).json(new ApiResponse(200, {
      count: trainees.length,
      trainees
    }, 'Trainees fetched successfully'));
  } catch (error) {
    next(error);
  }
};

// @desc    Get single trainee by ID
// @route   GET /api/trainees/:id
// @access  Private
exports.getTraineeById = async (req, res, next) => {
  try {
    const trainee = await Trainee.findById(req.params.id).populate('user', 'name email');
    if (!trainee) {
      return res.status(404).json(new ApiResponse(404, null, 'Trainee not found'));
    }
    res.status(200).json(new ApiResponse(200, trainee, 'Trainee fetched successfully'));
  } catch (error) {
    next(error);
  }
};
