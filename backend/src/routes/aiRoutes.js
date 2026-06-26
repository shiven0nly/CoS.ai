const express = require('express');
const { orchestrateDay, rescueDeadline } = require('../controllers/aiController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/orchestrate', orchestrateDay);
router.post('/rescue', rescueDeadline);

module.exports = router;

