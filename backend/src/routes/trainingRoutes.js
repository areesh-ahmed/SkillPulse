const express = require('express');
const {
  createProvider,
  createCourse,
  enrollInCourse,
  updateEnrollment
} = require('../controllers/trainingController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/provider', authorize('training_provider'), createProvider);
router.post('/courses', authorize('training_provider'), createCourse);
router.post('/enroll', authorize('trainee'), enrollInCourse);
router.put('/enrollments/:id', authorize('training_provider'), updateEnrollment);

module.exports = router;
