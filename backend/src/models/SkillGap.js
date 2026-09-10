const mongoose = require('mongoose');

const skillGapSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  requiredSkill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    required: true,
  },
  availableSkill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    required: true,
  },
  gapScore: {
    type: Number, // Higher means bigger gap
    required: true,
  },
  recommendation: String,
}, { timestamps: true });

module.exports = mongoose.model('SkillGap', skillGapSchema);
