const Analytics = require('../models/Analytics');
const AppError = require('../utils/AppError');

// @desc    Get user's analytics for a date range
// @route   GET /api/analytics
// @access  Private
exports.getAnalytics = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    let query = { user: req.user.id };
    
    if (startDate && endDate) {
      query.date = { 
        $gte: new Date(startDate), 
        $lte: new Date(endDate) 
      };
    }

    const analytics = await Analytics.find(query).sort('date');
    res.status(200).json({ success: true, count: analytics.length, data: analytics });
  } catch (error) {
    next(error);
  }
};
