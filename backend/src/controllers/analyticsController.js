const EmploymentRecord = require('../models/EmploymentRecord');
const FollowUp = require('../models/FollowUp');
const Enrollment = require('../models/Enrollment');
const Trainee = require('../models/Trainee');
const ApiResponse = require('../utils/apiResponse');

// @desc    Get aggregated government dashboard KPIs
// @route   GET /api/dashboard/government
// @access  Private (government)
exports.getGovernmentDashboard = async (req, res, next) => {
  try {
    // 1. Total Trainees & Employed Count
    const totalTrainees = await Trainee.countDocuments();
    const employedCount = await EmploymentRecord.countDocuments({ currentStatus: 'employed' });
    const overallEmploymentRate = totalTrainees > 0 ? (employedCount / totalTrainees) * 100 : 0;

    // 2. Average Salary
    const salaryData = await EmploymentRecord.aggregate([
      { $match: { currentStatus: 'employed', salary: { $exists: true, $ne: null } } },
      { $group: { _id: null, avgSalary: { $avg: '$salary' }, medianSalary: { $avg: '$salary' } } } // Simplification for median
    ]);
    const avgSalary = salaryData.length > 0 ? salaryData[0].avgSalary : 0;

    // 3. Employment Type Breakdown
    const employmentTypes = await EmploymentRecord.aggregate([
      { $match: { currentStatus: 'employed' } },
      { $group: { _id: '$employmentType', count: { $sum: 1 } } }
    ]);

    // 4. Attrition Reasons (from FollowUps)
    const attritionReasons = await FollowUp.aggregate([
      { $match: { 'response.employmentStatus': 'unemployed', 'response.attritionReason': { $ne: null } } },
      { $group: { _id: '$response.attritionReason', count: { $sum: 1 } } }
    ]);

    // 5. Total Certifications
    const certifiedCount = await Enrollment.countDocuments({ isCertified: true });

    res.status(200).json(new ApiResponse(200, {
      kpis: {
        totalTrainees,
        employedCount,
        overallEmploymentRate: overallEmploymentRate.toFixed(2),
        avgSalary: avgSalary.toFixed(2),
        certifiedCount
      },
      charts: {
        employmentTypes,
        attritionReasons
      }
    }, 'Dashboard data fetched successfully'));
  } catch (error) {
    next(error);
  }
};
