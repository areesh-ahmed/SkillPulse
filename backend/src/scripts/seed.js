const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const User = require('../models/User');
const Trainee = require('../models/Trainee');
const TrainingProvider = require('../models/TrainingProvider');
const Employer = require('../models/Employer');
const Course = require('../models/Course');
const Skill = require('../models/Skill');
const Enrollment = require('../models/Enrollment');
const EmploymentRecord = require('../models/EmploymentRecord');
const WageHistory = require('../models/WageHistory');
const Outcome = require('../models/Outcome');
const SkillRequirement = require('../models/SkillRequirement');
const SkillGap = require('../models/SkillGap');
const Consent = require('../models/Consent');
const EmployerVerification = require('../models/EmployerVerification');
const FollowUp = require('../models/FollowUp');

const districts = ['Pune', 'Mumbai', 'Nagpur', 'Nashik', 'Thane', 'Aurangabad'];
const educationLevels = ['10th Pass', '12th Pass', 'ITI', 'Diploma', 'Graduate'];

const generateSeedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/skillpulse';
    await mongoose.connect(mongoUri);
    console.log('Connected to database');

    console.log('Clearing existing data...');
    await Promise.all([
      User.deleteMany(), Trainee.deleteMany(), TrainingProvider.deleteMany(),
      Employer.deleteMany(), Course.deleteMany(), Skill.deleteMany(),
      Enrollment.deleteMany(), EmploymentRecord.deleteMany(), WageHistory.deleteMany(),
      Outcome.deleteMany(), SkillRequirement.deleteMany(), SkillGap.deleteMany(),
      Consent.deleteMany(), EmployerVerification.deleteMany(), FollowUp.deleteMany()
    ]);

    // Create Skills
    console.log('Creating skills...');
    const skillsData = [
      { name: 'Python Programming', category: 'IT', level: 'intermediate' },
      { name: 'React Development', category: 'IT', level: 'intermediate' },
      { name: 'CNC Machining', category: 'Manufacturing', level: 'advanced' },
      { name: 'Data Analysis', category: 'IT', level: 'intermediate' },
      { name: 'Welding', category: 'Manufacturing', level: 'beginner' },
      { name: 'Communication', category: 'Soft Skills', level: 'advanced' },
    ];
    const skills = await Skill.insertMany(skillsData);

    // Create Training Providers
    console.log('Creating providers...');
    const providers = [];
    for (let i = 1; i <= 3; i++) {
      const user = await User.create({
        name: `Provider ${i}`,
        email: `provider${i}@example.com`,
        password: 'password123',
        role: 'training_provider'
      });
      const provider = await TrainingProvider.create({
        user: user._id,
        organizationName: `Training Institute ${i}`,
        registrationNumber: `REG-${i}000`,
        address: { district: districts[i % districts.length], city: districts[i % districts.length] },
      });
      providers.push(provider);
    }

    // Create Courses
    console.log('Creating courses...');
    const coursesData = [
      { provider: providers[0]._id, title: 'Full Stack Development', sector: 'IT', durationHours: 200, skillsTaught: [skills[0]._id, skills[1]._id] },
      { provider: providers[1]._id, title: 'Advanced Manufacturing', sector: 'Manufacturing', durationHours: 150, skillsTaught: [skills[2]._id, skills[4]._id] },
      { provider: providers[2]._id, title: 'Data Science Basics', sector: 'IT', durationHours: 100, skillsTaught: [skills[3]._id] },
    ];
    const courses = await Course.insertMany(coursesData);

    // Create Employers
    console.log('Creating employers...');
    const employers = [];
    for (let i = 1; i <= 5; i++) {
      const user = await User.create({
        name: `Employer ${i}`,
        email: `employer${i}@example.com`,
        password: 'password123',
        role: 'employer'
      });
      const employer = await Employer.create({
        user: user._id,
        companyName: `Tech Corp ${i}`,
        industry: i % 2 === 0 ? 'IT' : 'Manufacturing',
        location: { district: districts[i % districts.length], city: districts[i % districts.length] },
      });
      employers.push(employer);
    }

    // Create Trainees (100)
    console.log('Creating 100+ trainees & related records...');
    for (let i = 1; i <= 100; i++) {
      const user = await User.create({
        name: `Trainee ${i}`,
        email: `trainee${i}@example.com`,
        password: 'password123',
        role: 'trainee'
      });

      const trainee = await Trainee.create({
        user: user._id,
        educationLevel: educationLevels[i % educationLevels.length],
        district: districts[i % districts.length],
        contactNumber: `9876543${String(i).padStart(3, '0')}`,
        skillPulseId: `SP-2026-${String(i).padStart(4, '0')}`,
        consentStatus: true,
      });

      await Consent.create({
        trainee: trainee._id,
        purpose: 'employment_tracking',
        status: 'granted'
      });

      // Enroll in random course
      const course = courses[i % courses.length];
      const isCompleted = i % 3 !== 0; // 2/3 complete it
      const enrollment = await Enrollment.create({
        trainee: trainee._id,
        course: course._id,
        provider: course.provider,
        status: isCompleted ? 'completed' : 'in_progress',
        attendancePercentage: Math.floor(Math.random() * 20) + 80,
        isCertified: isCompleted,
      });

      if (isCompleted) {
        // Some get employed
        if (i % 2 === 0) {
          const employer = employers[i % employers.length];
          const employment = await EmploymentRecord.create({
            trainee: trainee._id,
            employer: employer._id,
            jobRole: 'Junior Engineer',
            joiningDate: new Date(),
            currentStatus: 'employed',
            employmentType: 'full_time',
            salary: Math.floor(Math.random() * 20000) + 15000,
            trainingRelevance: 'highly_relevant'
          });

          await WageHistory.create({
            trainee: trainee._id,
            employmentRecord: employment._id,
            salary: employment.salary,
            date: employment.joiningDate,
          });

          await Outcome.create({
            trainee: trainee._id,
            employment: true,
            retention: Math.floor(Math.random() * 12) + 1,
            wageProgression: 10,
            relevance: 4,
            outcomeScore: 85,
          });
        } else {
          await Outcome.create({
            trainee: trainee._id,
            employment: false,
            outcomeScore: 30,
          });
        }
      }
    }

    console.log('Seed data generated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

generateSeedData();
