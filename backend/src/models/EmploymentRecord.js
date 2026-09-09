const mongoose = require('mongoose');

const employmentRecordSchema = new mongoose.Schema({
  trainee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainee',
    required: true,
    index: true,
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
    // Optional because self-employed won't have an employer profile linked
  },
  employerName: {
    type: String, // Used if self-employed or employer not registered
  },
  jobRole: {
    type: String,
    required: true,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  currentStatus: {
    type: String,
    enum: ['employed', 'unemployed', 'job_seeking'],
    default: 'employed',
  },
  employmentType: {
    type: String,
    enum: ['full_time', 'part_time', 'self_employed', 'apprenticeship', 'contract'],
    required: true,
  },
  salary: {
    type: Number,
  },
  trainingRelevance: {
    type: String,
    enum: ['highly_relevant', 'somewhat_relevant', 'not_relevant'],
  }
}, { timestamps: true });

module.exports = mongoose.model('EmploymentRecord', employmentRecordSchema);
