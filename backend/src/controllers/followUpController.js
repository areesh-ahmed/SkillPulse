const FollowUp = require('../models/FollowUp');
const Trainee = require('../models/Trainee');
const ApiResponse = require('../utils/apiResponse');

// @desc    Schedule a follow-up
// @route   POST /api/follow-ups/schedule
// @access  Private (government, training_provider)
exports.scheduleFollowUp = async (req, res, next) => {
  try {
    const { traineeId, scheduledDate, type, channel } = req.body;

    const trainee = await Trainee.findById(traineeId);
    if (!trainee) {
      return res.status(404).json(new ApiResponse(404, null, 'Trainee not found'));
    }

    const followUp = await FollowUp.create({
      trainee: traineeId,
      scheduledDate,
      type,
      channel: channel || 'whatsapp'
    });

    res.status(201).json(new ApiResponse(201, followUp, 'Follow-up scheduled successfully'));
  } catch (error) {
    next(error);
  }
};

// @desc    Record a follow-up response (simulating webhook from WhatsApp/SMS)
// @route   POST /api/follow-ups/:id/response
// @access  Private
exports.recordResponse = async (req, res, next) => {
  try {
    const { employmentStatus, currentSalary, attritionReason, notes } = req.body;

    const followUp = await FollowUp.findById(req.params.id);
    if (!followUp) {
      return res.status(404).json(new ApiResponse(404, null, 'Follow-up not found'));
    }

    followUp.status = 'completed';
    followUp.response = {
      employmentStatus,
      currentSalary,
      attritionReason,
      notes
    };

    await followUp.save();

    // Mock sending acknowledgment via the same channel
    console.log(`[MOCK ${followUp.channel.toUpperCase()}] Response recorded. Thank you for your feedback!`);

    res.status(200).json(new ApiResponse(200, followUp, 'Follow-up response recorded'));
  } catch (error) {
    next(error);
  }
};

// @desc    Get follow-ups for a trainee
// @route   GET /api/follow-ups/trainee/:traineeId
// @access  Private
exports.getTraineeFollowUps = async (req, res, next) => {
  try {
    const followUps = await FollowUp.find({ trainee: req.params.traineeId });
    res.status(200).json(new ApiResponse(200, followUps, 'Follow-ups fetched successfully'));
  } catch (error) {
    next(error);
  }
};
