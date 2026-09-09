const mongoose = require('mongoose');

const skillGapSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  requiredSkill: {
    type: String,
    required: true,
  },
  availableSkill: {
    type: String,
    required: true,
  },
  gapScore: {
    type: Number, // Higher means bigger gap
    required: true,
  },
  recommendation: String,
}, { timestamps: true });

module.exports = mongoose.model('SkillGap', skillGapSchema);
