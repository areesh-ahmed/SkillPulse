const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  companyName: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
    index: true,
  },
  location: {
    district: String,
    city: String,
    state: { type: String, default: 'Maharashtra' },
  },
  contactEmail: String,
  contactPhone: String,
}, { timestamps: true });

module.exports = mongoose.model('Employer', employerSchema);
