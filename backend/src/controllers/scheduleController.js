const Schedule = require('../models/Schedule');
const AppError = require('../utils/AppError');

// @desc    Get user's schedule for a specific date
// @route   GET /api/schedules/:date
// @access  Private
exports.getSchedule = async (req, res, next) => {
  try {
    const dateStr = req.params.date; // Expecting YYYY-MM-DD
    const date = new Date(dateStr);
    
    const schedule = await Schedule.findOne({ user: req.user.id, date }).populate('blocks.task');
    
    if (!schedule) {
      return res.status(200).json({ success: true, data: { blocks: [] } });
    }

    res.status(200).json({ success: true, data: schedule });
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update a schedule block
// @route   POST /api/schedules
// @access  Private
exports.saveSchedule = async (req, res, next) => {
  try {
    const { date, blocks } = req.body;
    let schedule = await Schedule.findOne({ user: req.user.id, date: new Date(date) });

    if (schedule) {
      schedule.blocks = blocks;
      await schedule.save();
    } else {
      schedule = await Schedule.create({ user: req.user.id, date, blocks });
    }

    res.status(200).json({ success: true, data: schedule });
  } catch (error) {
    next(error);
  }
};
