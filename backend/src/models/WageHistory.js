const mongoose = require('mongoose');

const wageHistorySchema = new mongoose.Schema({
  trainee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainee',
    required: true,
    index: true,
  },
  employmentRecord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EmploymentRecord',
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('WageHistory', wageHistorySchema);
