const mongoose = require('mongoose');

const followUpSchema = new mongoose.Schema({
  trainee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainee',
    required: true,
  },
  scheduledDate: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ['3_month', '6_month', '12_month', 'ad_hoc'],
    required: true,
  },
  channel: {
    type: String,
    enum: ['whatsapp', 'sms', 'email', 'call'],
    default: 'whatsapp',
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'no_response'],
    default: 'pending',
  },
  response: {
    employmentStatus: String, // 'employed', 'unemployed'
    currentSalary: Number,
    attritionReason: {
      type: String,
      enum: ['low_salary', 'skill_mismatch', 'relocation', 'better_opportunity', 'work_environment', 'personal', 'other', 'none']
    },
    notes: String
  }
}, { timestamps: true });

module.exports = mongoose.model('FollowUp', followUpSchema);
