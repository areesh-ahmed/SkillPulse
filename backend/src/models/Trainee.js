const mongoose = require('mongoose');

const traineeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  educationLevel: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
    index: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  skillPulseId: {
    type: String,
    unique: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Trainee', traineeSchema);
