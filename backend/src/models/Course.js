const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrainingProvider',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  sector: {
    type: String,
    required: true,
    index: true
  },
  durationHours: {
    type: Number,
    required: true
  },
  description: String,
  curriculum: [String],
  skillsTaught: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
