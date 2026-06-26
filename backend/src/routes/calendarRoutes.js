const express = require('express');
const { syncCalendar } = require('../controllers/calendarController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/sync', protect, syncCalendar);

module.exports = router;
