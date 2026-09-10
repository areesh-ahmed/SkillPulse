const mongoose = require('mongoose');

const skillRequirementSchema = new mongoose.Schema({
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
    required: true,
    index: true,
  },
  jobRole: {
    type: String,
    required: true,
  },
  requiredSkills: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
  }]
}, { timestamps: true });

module.exports = mongoose.model('SkillRequirement', skillRequirementSchema);
