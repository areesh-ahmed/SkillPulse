const express = require('express');
const {
  scheduleFollowUp,
  recordResponse,
  getTraineeFollowUps
} = require('../controllers/followUpController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/schedule', authorize('government', 'training_provider'), scheduleFollowUp);
// Ideally response would be a webhook from Twilio/WhatsApp, but for MVP we simulate it as an API call
router.post('/:id/response', recordResponse); 
router.get('/trainee/:traineeId', getTraineeFollowUps);

module.exports = router;
