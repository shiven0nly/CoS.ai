const express = require('express');
const { orchestrateDay, rescueDeadline, generateSchedule } = require('../controllers/aiController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/orchestrate', orchestrateDay);
router.post('/rescue', rescueDeadline);
router.post('/generate-schedule', generateSchedule);

module.exports = router;

