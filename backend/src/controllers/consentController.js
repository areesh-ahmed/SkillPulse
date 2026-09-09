const Consent = require('../models/Consent');
const Trainee = require('../models/Trainee');
const ApiResponse = require('../utils/apiResponse');

// @desc    Grant or update consent
// @route   POST /api/consent
// @access  Private (trainee)
exports.grantConsent = async (req, res, next) => {
  try {
    const { purpose, status } = req.body;

    const trainee = await Trainee.findOne({ user: req.user.id });
    if (!trainee) {
      return res.status(404).json(new ApiResponse(404, null, 'Trainee profile not found'));
    }

    let consent = await Consent.findOne({ trainee: trainee._id, purpose });

    if (consent) {
      consent.status = status;
      consent.timestamp = Date.now();
      await consent.save();
    } else {
      consent = await Consent.create({
        trainee: trainee._id,
        purpose,
        status,
      });
    }

    res.status(200).json(new ApiResponse(200, consent, `Consent ${status} successfully`));
  } catch (error) {
    next(error);
  }
};

// @desc    Get all consents for current trainee
// @route   GET /api/consent
// @access  Private (trainee)
exports.getConsents = async (req, res, next) => {
  try {
    const trainee = await Trainee.findOne({ user: req.user.id });
    if (!trainee) {
      return res.status(404).json(new ApiResponse(404, null, 'Trainee profile not found'));
    }

    const consents = await Consent.find({ trainee: trainee._id });

    res.status(200).json(new ApiResponse(200, consents, 'Consents fetched successfully'));
  } catch (error) {
    next(error);
  }
};
