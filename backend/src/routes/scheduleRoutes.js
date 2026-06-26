const express = require('express');
const { getSchedule, saveSchedule } = require('../controllers/scheduleController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, saveSchedule);

router.route('/:date')
  .get(protect, getSchedule);

module.exports = router;
