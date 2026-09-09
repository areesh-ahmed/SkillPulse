const express = require('express');
const {
  getPendingVerifications,
  processVerification
} = require('../controllers/verificationController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);
router.use(authorize('employer'));

router.get('/pending', getPendingVerifications);
router.put('/:id', processVerification);

module.exports = router;
