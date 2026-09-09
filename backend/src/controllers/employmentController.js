const EmploymentRecord = require('../models/EmploymentRecord');
const Trainee = require('../models/Trainee');
const Employer = require('../models/Employer');
const EmployerVerification = require('../models/EmployerVerification');
const ApiResponse = require('../utils/apiResponse');

// @desc    Create an employment record
// @route   POST /api/employment
// @access  Private (trainee)
exports.createEmploymentRecord = async (req, res, next) => {
  try {
    const { employerId, employerName, jobRole, joiningDate, employmentType, salary, trainingRelevance } = req.body;

    const trainee = await Trainee.findOne({ user: req.user.id });
    if (!trainee) {
      return res.status(404).json(new ApiResponse(404, null, 'Trainee profile not found'));
    }

    const record = await EmploymentRecord.create({
      trainee: trainee._id,
      employer: employerId || undefined,
      employerName,
      jobRole,
      joiningDate,
      employmentType,
      salary,
      trainingRelevance,
      currentStatus: 'employed'
    });

    // If an employerId was provided, auto-generate a pending verification request
    if (employerId) {
      await EmployerVerification.create({
        employmentRecord: record._id,
        employer: employerId,
        status: 'pending'
      });
    }

    res.status(201).json(new ApiResponse(201, record, 'Employment record created successfully'));
  } catch (error) {
    next(error);
  }
};

// @desc    Update employment record
// @route   PUT /api/employment/:id
// @access  Private (trainee)
exports.updateEmploymentRecord = async (req, res, next) => {
  try {
    const trainee = await Trainee.findOne({ user: req.user.id });
    
    let record = await EmploymentRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).json(new ApiResponse(404, null, 'Employment record not found'));
    }

    if (record.trainee.toString() !== trainee._id.toString()) {
      return res.status(403).json(new ApiResponse(403, null, 'Not authorized to update this record'));
    }

    const { currentStatus, salary, employmentType } = req.body;
    
    record.currentStatus = currentStatus || record.currentStatus;
    record.salary = salary || record.salary;
    record.employmentType = employmentType || record.employmentType;

    await record.save();

    res.status(200).json(new ApiResponse(200, record, 'Employment record updated successfully'));
  } catch (error) {
    next(error);
  }
};

// @desc    Get all employment records for a trainee
// @route   GET /api/employment/me
// @access  Private (trainee)
exports.getMyEmploymentRecords = async (req, res, next) => {
  try {
    const trainee = await Trainee.findOne({ user: req.user.id });
    if (!trainee) {
      return res.status(404).json(new ApiResponse(404, null, 'Trainee profile not found'));
    }

    const records = await EmploymentRecord.find({ trainee: trainee._id }).populate('employer', 'companyName');
    res.status(200).json(new ApiResponse(200, records, 'Employment records fetched'));
  } catch (error) {
    next(error);
  }
};
