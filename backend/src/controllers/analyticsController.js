const AnalyticsService = require('../services/AnalyticsService');
const ApiResponse = require('../utils/apiResponse');

// @desc    Get aggregated government dashboard KPIs
// @route   GET /api/dashboard/government
// @access  Private (government)
exports.getGovernmentDashboard = async (req, res, next) => {
  try {
    const dashboardData = await AnalyticsService.getGovernmentDashboardData();

    res.status(200).json(new ApiResponse(200, dashboardData, 'Dashboard data fetched successfully'));
  } catch (error) {
    next(error);
  }
};

// @desc    Get data structured for AI service
// @route   GET /api/dashboard/ai-data
// @access  Private (internal/system)
exports.getAIReadyData = async (req, res, next) => {
  try {
    const aiData = await AnalyticsService.getAIReadyData();

    res.status(200).json(new ApiResponse(200, aiData, 'AI ready data fetched successfully'));
  } catch (error) {
    next(error);
  }
};
