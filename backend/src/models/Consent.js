const mongoose = require('mongoose');

const consentSchema = new mongoose.Schema({
  trainee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainee',
    required: true,
  },
  purpose: {
    type: String,
    required: true,
    enum: ['data_sharing', 'employment_tracking', 'marketing'],
  },
  status: {
    type: String,
    enum: ['granted', 'withdrawn'],
    default: 'granted',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

module.exports = mongoose.model('Consent', consentSchema);
