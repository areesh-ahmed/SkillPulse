const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  trainee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainee',
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrainingProvider',
    required: true,
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['enrolled', 'in_progress', 'completed', 'dropped'],
    default: 'enrolled',
  },
  attendancePercentage: {
    type: Number,
    default: 0,
  },
  assessmentScore: {
    type: Number,
  },
  isCertified: {
    type: Boolean,
    default: false,
  },
  certificationDate: {
    type: Date,
  }
}, { timestamps: true });

// Ensure a trainee doesn't enroll in the same course multiple times
enrollmentSchema.index({ trainee: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
