const express = require('express');
const { orchestrateDay } = require('../controllers/aiController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect); // All AI routes protected

router.post('/orchestrate', orchestrateDay);

module.exports = router;

