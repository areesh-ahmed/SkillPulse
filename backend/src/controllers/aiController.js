const aiService = require('../services/aiService');
const Course = require('../models/Course');
const SkillGap = require('../models/SkillGap');
const ApiResponse = require('../utils/apiResponse');

// @desc    Detect skill gaps for a course vs employer requirements
// @route   POST /api/ai/skill-gap
// @access  Private (government, training_provider)
exports.detectSkillGap = async (req, res, next) => {
  try {
    const { courseId, requiredSkills } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json(new ApiResponse(404, null, 'Course not found'));
    }

    // Call the mock AI service
    const aiResult = await aiService.detectSkillGaps(course.curriculum, requiredSkills);

    // If there's a gap, store it in the database
    if (aiResult.hasGap) {
      for (const rec of aiResult.recommendations) {
        await SkillGap.create({
          course: course._id,
          requiredSkill: rec.requiredSkill,
          availableSkill: course.curriculum.join(', '), // Simplification for MVP
          gapScore: rec.gapScore,
          recommendation: rec.recommendationText
        });
      }
    }

    res.status(200).json(new ApiResponse(200, aiResult, 'Skill gap analysis completed'));
  } catch (error) {
    next(error);
  }
};

// @desc    Predict employment probability for a trainee
// @route   POST /api/ai/predict-employment
// @access  Private (government, training_provider)
exports.predictEmployment = async (req, res, next) => {
  try {
    const { traineeId } = req.body; // In real life, we would fetch the trainee's full profile
    
    // Call the mock AI service
    const prediction = await aiService.predictEmploymentProbability({ id: traineeId });

    res.status(200).json(new ApiResponse(200, prediction, 'Employment prediction generated'));
  } catch (error) {
    next(error);
  }
};
