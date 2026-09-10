const mongoose = require('mongoose');

const outcomeSchema = new mongoose.Schema({
  trainee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainee',
    required: true,
    unique: true,
  },
  employment: {
    type: Boolean,
    default: false,
  },
  retention: {
    type: Number, // in months
    default: 0,
  },
  wageProgression: {
    type: Number, // percentage increase
    default: 0,
  },
  relevance: {
    type: Number, // score 1-5
    min: 1,
    max: 5,
  },
  outcomeScore: {
    type: Number, // overall computed score 0-100
    default: 0,
  }
}, { timestamps: true });

module.exports = mongoose.model('Outcome', outcomeSchema);
