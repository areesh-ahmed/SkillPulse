const express = require('express');
const {
  detectSkillGap,
  predictEmployment
} = require('../controllers/aiController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);
router.use(authorize('government', 'training_provider'));

router.post('/skill-gap', detectSkillGap);
router.post('/predict-employment', predictEmployment);

module.exports = router;
