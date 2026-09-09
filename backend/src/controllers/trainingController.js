const Course = require('../models/Course');
const TrainingProvider = require('../models/TrainingProvider');
const Enrollment = require('../models/Enrollment');
const Trainee = require('../models/Trainee');
const ApiResponse = require('../utils/apiResponse');

// @desc    Create a training provider profile
// @route   POST /api/training/provider
// @access  Private (training_provider)
exports.createProvider = async (req, res, next) => {
  try {
    const { organizationName, registrationNumber, address, contactEmail, contactPhone } = req.body;

    const existingProvider = await TrainingProvider.findOne({ user: req.user.id });
    if (existingProvider) {
      return res.status(400).json(new ApiResponse(400, null, 'Provider profile already exists'));
    }

    const provider = await TrainingProvider.create({
      user: req.user.id,
      organizationName,
      registrationNumber,
      address,
      contactEmail,
      contactPhone
    });

    res.status(201).json(new ApiResponse(201, provider, 'Provider profile created successfully'));
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new course
// @route   POST /api/training/courses
// @access  Private (training_provider)
exports.createCourse = async (req, res, next) => {
  try {
    const provider = await TrainingProvider.findOne({ user: req.user.id });
    if (!provider) {
      return res.status(404).json(new ApiResponse(404, null, 'Training provider profile not found'));
    }

    const { title, sector, durationHours, description, curriculum } = req.body;

    const course = await Course.create({
      provider: provider._id,
      title,
      sector,
      durationHours,
      description,
      curriculum
    });

    res.status(201).json(new ApiResponse(201, course, 'Course created successfully'));
  } catch (error) {
    next(error);
  }
};

// @desc    Enroll a trainee in a course
// @route   POST /api/training/enroll
// @access  Private (trainee)
exports.enrollInCourse = async (req, res, next) => {
  try {
    const { courseId } = req.body;

    const trainee = await Trainee.findOne({ user: req.user.id });
    if (!trainee) {
      return res.status(404).json(new ApiResponse(404, null, 'Trainee profile not found'));
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json(new ApiResponse(404, null, 'Course not found'));
    }

    const enrollment = await Enrollment.create({
      trainee: trainee._id,
      course: course._id,
      provider: course.provider
    });

    res.status(201).json(new ApiResponse(201, enrollment, 'Enrolled successfully'));
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json(new ApiResponse(400, null, 'Already enrolled in this course'));
    }
    next(error);
  }
};

// @desc    Update enrollment status (attendance, assessment, certification)
// @route   PUT /api/training/enrollments/:id
// @access  Private (training_provider)
exports.updateEnrollment = async (req, res, next) => {
  try {
    const { status, attendancePercentage, assessmentScore, isCertified } = req.body;

    const provider = await TrainingProvider.findOne({ user: req.user.id });
    if (!provider) {
      return res.status(403).json(new ApiResponse(403, null, 'Not authorized'));
    }

    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json(new ApiResponse(404, null, 'Enrollment not found'));
    }

    // Check if the enrollment belongs to a course offered by this provider
    if (enrollment.provider.toString() !== provider._id.toString()) {
      return res.status(403).json(new ApiResponse(403, null, 'Not authorized to update this enrollment'));
    }

    enrollment.status = status || enrollment.status;
    if (attendancePercentage !== undefined) enrollment.attendancePercentage = attendancePercentage;
    if (assessmentScore !== undefined) enrollment.assessmentScore = assessmentScore;
    
    if (isCertified === true && !enrollment.isCertified) {
      enrollment.isCertified = true;
      enrollment.certificationDate = Date.now();
      enrollment.status = 'completed';
    } else if (isCertified === false) {
      enrollment.isCertified = false;
      enrollment.certificationDate = undefined;
    }

    await enrollment.save();

    res.status(200).json(new ApiResponse(200, enrollment, 'Enrollment updated successfully'));
  } catch (error) {
    next(error);
  }
};
