const EmployerVerification = require('../models/EmployerVerification');
const Employer = require('../models/Employer');
const ApiResponse = require('../utils/apiResponse');

// @desc    Get all pending verification requests for an employer
// @route   GET /api/verification/pending
// @access  Private (employer)
exports.getPendingVerifications = async (req, res, next) => {
  try {
    const employer = await Employer.findOne({ user: req.user.id });
    if (!employer) {
      return res.status(404).json(new ApiResponse(404, null, 'Employer profile not found'));
    }

    const verifications = await EmployerVerification.find({ 
      employer: employer._id,
      status: 'pending'
    }).populate({
      path: 'employmentRecord',
      populate: {
        path: 'trainee',
        select: 'educationLevel district'
      }
    });

    res.status(200).json(new ApiResponse(200, verifications, 'Pending verifications fetched successfully'));
  } catch (error) {
    next(error);
  }
};

// @desc    Process a verification request (confirm/reject)
// @route   PUT /api/verification/:id
// @access  Private (employer)
exports.processVerification = async (req, res, next) => {
  try {
    const { status, verificationNotes, confidenceScore } = req.body; // status should be 'verified' or 'rejected'

    const employer = await Employer.findOne({ user: req.user.id });
    if (!employer) {
      return res.status(403).json(new ApiResponse(403, null, 'Not authorized'));
    }

    const verification = await EmployerVerification.findById(req.params.id);
    if (!verification) {
      return res.status(404).json(new ApiResponse(404, null, 'Verification record not found'));
    }

    if (verification.employer.toString() !== employer._id.toString()) {
      return res.status(403).json(new ApiResponse(403, null, 'Not authorized to process this verification'));
    }

    verification.status = status;
    verification.verificationNotes = verificationNotes;
    
    // Typically the system calculates this based on signals, but we allow employer to set it for MVP mocking
    if (confidenceScore !== undefined) {
      verification.confidenceScore = confidenceScore;
    }

    await verification.save();

    res.status(200).json(new ApiResponse(200, verification, `Verification request marked as ${status}`));
  } catch (error) {
    next(error);
  }
};
