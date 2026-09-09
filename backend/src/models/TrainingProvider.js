const mongoose = require('mongoose');

const trainingProviderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  organizationName: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    district: String,
    city: String,
    state: { type: String, default: 'Maharashtra' },
  },
  contactEmail: String,
  contactPhone: String,
}, { timestamps: true });

module.exports = mongoose.model('TrainingProvider', trainingProviderSchema);
