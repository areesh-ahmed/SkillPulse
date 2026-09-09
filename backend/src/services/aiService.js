/**
 * Mock Service layer for the Python FastAPI AI Microservice.
 * In production, these methods would make HTTP requests to the Python service.
 */

exports.detectSkillGaps = async (courseSkills, requiredSkills) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock implementation: randomly identify a missing skill and assign a gap score
  const missingSkills = requiredSkills.filter(skill => !courseSkills.includes(skill));
  
  if (missingSkills.length === 0) {
    return {
      hasGap: false,
      gapScore: 0,
      recommendations: []
    };
  }

  const recommendations = missingSkills.map(skill => ({
    requiredSkill: skill,
    gapScore: Math.floor(Math.random() * 50) + 50, // 50-100 severity
    recommendationText: `Add a module covering ${skill} to the curriculum.`
  }));

  return {
    hasGap: true,
    overallGapScore: recommendations.reduce((acc, curr) => acc + curr.gapScore, 0) / recommendations.length,
    recommendations
  };
};

exports.predictEmploymentProbability = async (traineeData) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return a random probability between 40% and 95%
  return {
    probability: Math.floor(Math.random() * 55) + 40,
    topFactors: ['High attendance', 'In-demand sector', 'Local district demand']
  };
};
