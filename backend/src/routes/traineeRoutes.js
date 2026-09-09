const express = require('express');
const {
  createTraineeProfile,
  getMe,
  updateTraineeProfile,
  getTrainees,
  getTraineeById,
} = require('../controllers/traineeController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/', authorize('trainee'), createTraineeProfile);
router.get('/me', authorize('trainee'), getMe);
router.put('/me', authorize('trainee'), updateTraineeProfile);

router.get('/', authorize('government', 'training_provider', 'employer'), getTrainees);
router.get('/:id', getTraineeById); // Accessible by any authenticated user, refine if needed

module.exports = router;
