const express = require('express');
const {
  createEmploymentRecord,
  updateEmploymentRecord,
  getMyEmploymentRecords
} = require('../controllers/employmentController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/', authorize('trainee'), createEmploymentRecord);
router.put('/:id', authorize('trainee'), updateEmploymentRecord);
router.get('/me', authorize('trainee'), getMyEmploymentRecords);

module.exports = router;
