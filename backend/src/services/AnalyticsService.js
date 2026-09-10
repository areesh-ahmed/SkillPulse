const mongoose = require('mongoose');
const Trainee = require('../models/Trainee');
const Enrollment = require('../models/Enrollment');
const EmploymentRecord = require('../models/EmploymentRecord');
const FollowUp = require('../models/FollowUp');
const Course = require('../models/Course');
const SkillGap = require('../models/SkillGap');
const WageHistory = require('../models/WageHistory');
const Outcome = require('../models/Outcome');

class AnalyticsService {
  async getEmploymentAnalytics() {
    const totalTrainees = await Trainee.countDocuments();
    const certifiedCount = await Enrollment.countDocuments({ isCertified: true });
    
    const employmentStats = await EmploymentRecord.aggregate([
      {
        $facet: {
          totalEmployed: [
            { $match: { currentStatus: 'employed' } },
            { $count: 'count' }
          ],
          employmentTypes: [
            { $match: { currentStatus: 'employed' } },
            { $group: { _id: '$employmentType', count: { $sum: 1 } } }
          ],
          unemployed: [
            { $match: { currentStatus: 'unemployed' } },
            { $count: 'count' }
          ]
        }
      }
    ]);

    const employedCount = employmentStats[0].totalEmployed[0]?.count || 0;
    const unemployedCount = employmentStats[0].unemployed[0]?.count || 0;
    const employmentRate = totalTrainees > 0 ? (employedCount / totalTrainees) * 100 : 0;
    
    return {
      totalTrainees,
      certifiedCount,
      employedCount,
      unemployedCount,
      employmentRate: Number(employmentRate.toFixed(2)),
      employmentTypes: employmentStats[0].employmentTypes,
    };
  }

  async getRetentionAnalytics() {
    const outcomes = await Outcome.aggregate([
      { $match: { employment: true } },
      {
        $group: {
          _id: null,
          avgRetentionMonths: { $avg: '$retention' },
          totalRetained6m: { $sum: { $cond: [{ $gte: ['$retention', 6] }, 1, 0] } },
          totalRetained12m: { $sum: { $cond: [{ $gte: ['$retention', 12] }, 1, 0] } },
          count: { $sum: 1 }
        }
      }
    ]);

    if (!outcomes.length || outcomes[0].count === 0) return { avgRetentionMonths: 0, retentionRate6m: 0, retentionRate12m: 0 };

    const { avgRetentionMonths, totalRetained6m, totalRetained12m, count } = outcomes[0];
    return {
      avgRetentionMonths: Number(avgRetentionMonths.toFixed(1)),
      retentionRate6m: Number(((totalRetained6m / count) * 100).toFixed(2)),
      retentionRate12m: Number(((totalRetained12m / count) * 100).toFixed(2))
    };
  }

  async getWageAnalytics() {
    const wageData = await WageHistory.aggregate([
      {
        $group: {
          _id: '$employmentRecord',
          salaries: { $push: '$salary' },
          firstSalary: { $first: '$salary' },
          lastSalary: { $last: '$salary' }
        }
      },
      {
        $project: {
          growthPct: {
            $cond: [
              { $gt: ['$firstSalary', 0] },
              { $multiply: [{ $divide: [{ $subtract: ['$lastSalary', '$firstSalary'] }, '$firstSalary'] }, 100] },
              0
            ]
          },
          lastSalary: 1
        }
      },
      {
        $group: {
          _id: null,
          avgSalary: { $avg: '$lastSalary' },
          avgWageGrowthPct: { $avg: '$growthPct' }
        }
      }
    ]);

    return {
      averageSalary: wageData[0]?.avgSalary ? Number(wageData[0].avgSalary.toFixed(2)) : 0,
      averageWageGrowthPct: wageData[0]?.avgWageGrowthPct ? Number(wageData[0].avgWageGrowthPct.toFixed(2)) : 0
    };
  }

  async getTrainingRelevance() {
    return await EmploymentRecord.aggregate([
      { $match: { currentStatus: 'employed', trainingRelevance: { $exists: true } } },
      {
        $group: {
          _id: '$trainingRelevance',
          count: { $sum: 1 }
        }
      }
    ]);
  }

  async getDistrictAnalytics() {
    return await Trainee.aggregate([
      {
        $lookup: {
          from: 'outcomes',
          localField: '_id',
          foreignField: 'trainee',
          as: 'outcomeData'
        }
      },
      { $unwind: { path: '$outcomeData', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$district',
          totalTrainees: { $sum: 1 },
          employedCount: { $sum: { $cond: ['$outcomeData.employment', 1, 0] } },
          avgOutcomeScore: { $avg: '$outcomeData.outcomeScore' }
        }
      },
      {
        $project: {
          district: '$_id',
          totalTrainees: 1,
          employedCount: 1,
          avgOutcomeScore: { $round: ['$avgOutcomeScore', 2] },
          _id: 0
        }
      },
      { $sort: { totalTrainees: -1 } }
    ]);
  }

  async getSkillGapAnalytics() {
    return await SkillGap.aggregate([
      {
        $lookup: {
          from: 'skills',
          localField: 'requiredSkill',
          foreignField: '_id',
          as: 'skillDetails'
        }
      },
      { $unwind: '$skillDetails' },
      {
        $group: {
          _id: '$skillDetails.name',
          avgGapScore: { $avg: '$gapScore' },
          affectedCourses: { $addToSet: '$course' }
        }
      },
      {
        $project: {
          skillName: '$_id',
          gapScore: { $round: ['$avgGapScore', 2] },
          affectedCoursesCount: { $size: '$affectedCourses' },
          _id: 0
        }
      },
      { $sort: { gapScore: -1 } },
      { $limit: 10 }
    ]);
  }

  async getAttritionAnalysis() {
    return await FollowUp.aggregate([
      { $match: { 'response.employmentStatus': 'unemployed', 'response.attritionReason': { $ne: null } } },
      {
        $group: {
          _id: '$response.attritionReason',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
  }

  async getAIReadyData() {
    const gaps = await SkillGap.find().populate('requiredSkill', 'name').lean();
    const attrition = await FollowUp.find({ 'response.employmentStatus': 'unemployed' }).lean();
    
    return {
      skillGapsDataset: gaps.map(g => ({
        courseId: g.course,
        missingSkill: g.requiredSkill?.name,
        gapScore: g.gapScore
      })),
      attritionDataset: attrition.map(a => ({
        traineeId: a.trainee,
        reason: a.response?.attritionReason
      }))
    };
  }

  async calculateOverallImpactScore() {
    const outcomes = await Outcome.aggregate([
      {
        $group: {
          _id: null,
          avgScore: { $avg: '$outcomeScore' }
        }
      }
    ]);
    return outcomes.length > 0 ? Number(outcomes[0].avgScore.toFixed(2)) : 0;
  }

  async getGovernmentDashboardData() {
    const [
      employment,
      retention,
      wage,
      relevance,
      districts,
      skillGaps,
      attrition,
      overallImpactScore
    ] = await Promise.all([
      this.getEmploymentAnalytics(),
      this.getRetentionAnalytics(),
      this.getWageAnalytics(),
      this.getTrainingRelevance(),
      this.getDistrictAnalytics(),
      this.getSkillGapAnalytics(),
      this.getAttritionAnalysis(),
      this.calculateOverallImpactScore()
    ]);

    // Calculate percentages for employment types
    const totalEmployedTypes = employment.employmentTypes.reduce((acc, curr) => acc + curr.count, 0);
    const formattedEmploymentTypes = employment.employmentTypes.map(type => ({
      _id: type._id,
      count: type.count,
      percentage: totalEmployedTypes > 0 ? Number(((type.count / totalEmployedTypes) * 100).toFixed(1)) : 0
    }));

    return {
      kpis: {
        totalTrainees: employment.totalTrainees,
        certifiedCount: employment.certifiedCount,
        employedCount: employment.employedCount,
        employmentRate: employment.employmentRate,
        averageSalary: wage.averageSalary,
        retentionRate6m: retention.retentionRate6m,
        averageWageGrowthPct: wage.averageWageGrowthPct,
        overallImpactScore
      },
      employmentTypes: formattedEmploymentTypes,
      trainingRelevance: relevance,
      attritionAnalysis: attrition,
      districtPerformance: districts,
      skillGaps: skillGaps
    };
  }
}

module.exports = new AnalyticsService();
