const express = require('express');
const { grantConsent, getConsents } = require('../controllers/consentController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);
router.use(authorize('trainee'));

router.post('/', grantConsent);
router.get('/', getConsents);

module.exports = router;
