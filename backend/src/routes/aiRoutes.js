const express = require('express');
const { breakdownGoal, rescueDeadline } = require('../controllers/aiController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect); // All AI routes protected

router.post('/breakdown', breakdownGoal);
router.post('/rescue', rescueDeadline);

module.exports = router;
