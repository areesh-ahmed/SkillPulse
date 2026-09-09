const express = require('express');
const { getGovernmentDashboard } = require('../controllers/analyticsController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/government', authorize('government'), getGovernmentDashboard);

module.exports = router;
