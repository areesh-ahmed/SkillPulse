const mongoose = require('mongoose');

const employerVerificationSchema = new mongoose.Schema({
  employmentRecord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EmploymentRecord',
    required: true,
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },
  signals: {
    emailDomainMatch: Boolean,
    epfoLinkFound: Boolean,
  },
  confidenceScore: {
    type: Number, // 0 to 100
    default: 0
  },
  verificationNotes: String
}, { timestamps: true });

module.exports = mongoose.model('EmployerVerification', employerVerificationSchema);
