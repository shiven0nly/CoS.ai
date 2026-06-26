const AppError = require('../utils/AppError');

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
exports.getNotifications = async (req, res, next) => {
  try {
    // Mock response for Notifications (e.g., "15 mins until deep work session")
    res.status(200).json({ 
      success: true, 
      data: [
        { id: 1, type: "alert", message: "Task 'Pitch Deck' is overdue." },
        { id: 2, type: "ai-insight", message: "You have 2 hours free. Shall I generate a focus block?" }
      ] 
    });
  } catch (error) {
    next(error);
  }
};
