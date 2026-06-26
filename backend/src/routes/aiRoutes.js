const express = require('express');
const { orchestrateDay, rescueDeadline, generateSchedule, rankPriorities, productivityCoach } = require('../controllers/aiController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/orchestrate', orchestrateDay);
router.post('/rescue', rescueDeadline);
router.post('/generate-schedule', generateSchedule);
router.post('/rank-priorities', rankPriorities);
router.post('/coach', productivityCoach);

module.exports = router;

